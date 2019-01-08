import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Container
} from 'reactstrap';


function StoryCarouselItem(props) {
  let heightStyle = {height: '100%'};
  let textHeightStyle = {height: '85%'};

  return (
      <CarouselItem
        onExiting={props.onExiting}
        onExited={props.onExited}
        className={props.in ? "active" : ""}
        style={heightStyle}
      >
        <Card style={heightStyle}>
          <CardBody id="StoryReaderCardBody" style={heightStyle} className="mx-3">
            <CardTitle className="story-title">{props.book.title}</CardTitle>
            <CardSubtitle className="story-subtitle">{props.book.authorName}</CardSubtitle>
            <CardText id="StoryReaderCardText" style={props.forcePageHeight ? textHeightStyle : {}} className="mt-3 mx-2">{props.storyPage.pageText}</CardText>
            <CardSubtitle className="story-subtitle   text-muted">{"Page " + props.storyPage.pageNumber}</CardSubtitle>
          </CardBody>
        </Card>

      </CarouselItem>
  );


}

function StoryCarousel(props) {
  let heightStyle = {height: '100%'};

  return (
      <div style={heightStyle}>
        <Carousel
            id = "StoryReader"
            className = "story-reader"
            style = {heightStyle}
            activeIndex = {props.activeIndex}
            visibility={props.arePagesInitialized}
            next = {props.next}
            previous = {props.previous}
            interval = {false}
          >
          {props.slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={props.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={props.next} />
        </Carousel>
      </div>
  );
}

class StoryReader extends Component {

  book =
  {
    title: "",
    authorName: "",
    bookText: ""
  };

  pageTextMaxCharLength = 4000;

  pageTextPercentDecimal = .70;
  pageTextPercentLowerBoundDecimal = .65;

  arePagesInitialized = false;
  isFirstPageInitialized = false;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      storyPages: []
    };


    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.preInitializePages = this.preInitializePages.bind(this);
    this.initializePages = this.initializePages.bind(this);
    this.measureText = this.measureText.bind(this);
    this.doesTextFitPage = this.doesTextFitPage.bind(this);
    this.getNewlineText = this.getNewlineText.bind(this);
    this.handlePageInitialization = this.handlePageInitialization.bind(this);
    this.onNextFrame = this.onNextFrame.bind(this);

    this.book.title = this.props.storySection.title;
    this.book.authorName = this.props.author.authorName;
    this.book.bookText = this.props.storySection.text;

    this.preInitializePages();
  }

  //initializes a blank page so that we can add inner html to use doesTextFitPage()
  preInitializePages() {
    //ensure there are no other pages
    this.state.storyPages = [];

    //add a blank page
    this.state.storyPages.push(
      {
        //get index
        pageNumber: 1,
        //get the text on the page
        pageText: "a"
      }
    );
  }

  //initializes all pages such that they will all fit within the given screen size
  initializePages() {

    var bookText= this.book.bookText;

    //ensure that the empty first page is not included in the final list of pages;
    if (!this.isFirstPageInitialized) {
      this.state.storyPages = [];
    }


    var upperBound = 0;
    var lowerBound = 0;
    var index = this.state.storyPages.length;

    if (!bookText.substring(lowerBound, bookText.length)) {
      return;
    }

    //if we can fit the rest of the story on this page, do it.
    if (this.doesTextFitPage(bookText.substring(lowerBound, bookText.length)) < 1) {
      upperBound = bookText.length;
    }
    //otherwise get the next characters to display on this page
    else {

      //binary search for the target length
      var currentLength = Math.ceil(this.pageTextMaxCharLength/2);
      var searchUpper = this.pageTextMaxCharLength;
      var searchLower = 0;

      var targetHeightHit = false;
      var hitInt;

      while (!targetHeightHit) {
        upperBound = lowerBound + currentLength;

        //if this is not a space, continue to the next space
        while(bookText.charAt(upperBound) !== ' ') {
          upperBound++;
          //upperbound can go up to length, because it is the location to the
          //right of the last character in the string
          if (upperBound > bookText.length) {
            upperBound = bookText.length;
            break;
          }
        }

        //get whether we've hit out target
        hitInt = this.doesTextFitPage(bookText.substring(lowerBound, upperBound));

        if (hitInt < 0) {
          //this is our new lower bound;
          searchLower = currentLength;
          var newCurrentLength = Math.ceil((currentLength + searchUpper)/2);
          if (currentLength === newCurrentLength) {
            targetHeightHit = true;
          }
          currentLength = newCurrentLength;
        }
        if (hitInt > 0) {
          //this is our new upper bound;
          searchUpper = currentLength;
          var newCurrentLength = Math.ceil((currentLength + searchLower)/2);
          if (currentLength === newCurrentLength) {
            targetHeightHit = true;
          }
          currentLength = newCurrentLength;
        }
        if (hitInt === 0) {
          targetHeightHit = true;
        }

      }

    }

    var pageText = this.getNewlineText(bookText.substring(lowerBound, upperBound));

    this.state.storyPages.push(
      {
        //get index
        pageNumber: index + 1,
        //get the text on the page
        pageText: pageText
      }
    );

    this.book.bookText = bookText.substring(upperBound, bookText.length);

    this.isFirstPageInitialized = true;
    this.arePagesInitialized = !this.book.bookText;

    this.forceUpdate();
  }

  measureText(pText, pFontSize, pStyle, width) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.className = "active carousel-item";
    lDiv.style.fontSize = pFontSize;
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
        width: (lDiv.clientWidth) % width,
        height: (lDiv.clientHeight) * (Math.ceil(lDiv.clientWidth/width)) + pFontSize
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
  }

  //returns 0 if the text fits the page. Returns 1 if its to large, and -1 if its too small
  doesTextFitPage(text) {
    //get the story reader's height and element
    var rootElement = document.getElementsByClassName("card-body")[this.state.activeIndex];
    var rootHeight = rootElement.scrollHeight;
    var pageTextElement = document.getElementsByClassName("card-text")[this.state.activeIndex];

    var style = window.getComputedStyle(pageTextElement, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);

    var pageTextHeight = text.split('\n').map((item) => {
      return this.measureText(item, fontSize, pageTextElement.style, pageTextElement.clientWidth).height;
    }).reduce((a, b) => a + b, 0);

    // get our height percent
    var heightDecimal = pageTextHeight / rootHeight;

    //return if this pages height percentage is within our accepted bounds.
    if (heightDecimal < this.pageTextPercentLowerBoundDecimal) {
      return -1;
    }
    
    if (heightDecimal > this.pageTextPercentDecimal) {
      return 1;
    }

    return 0;
  }

  getNewlineText(text) {
    //return text;
    return (
      <span>
        {
          text.split('\n').map((item, key) => {
            return <span key={key}>{item}<br /></span>
          })
        }
      </span>
    )
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    //do not allow turning pages while turning a page
    if (this.animating) return;
    //do not allow reading a page after the last page
    if (this.state.activeIndex === this.state.storyPages.length - 1) return;
    const nextIndex = this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    //donotallow turning pages while turning a page
    if (this.animating) return;
    //do not allow reading a page before the first page
    if (this.state.activeIndex === 0) return;
    const nextIndex = this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  handlePageInitialization() {
    //if all pages have been initialized, do not initialize any more pages
    if (this.arePagesInitialized) {
      return;
    }

    this.onNextFrame(this.initializePages);
  }

  onNextFrame(callback) {
    setTimeout(function () {
        window.requestAnimationFrame(callback);
    }, 0);
  }

  componentDidUpdate() {
    this.handlePageInitialization();
  }

  componentDidMount() {
    this.handlePageInitialization();
  }

  render() {
    let slides =
      this.state.storyPages.map((storyPage) => {
        return (
          <StoryCarouselItem storyPage={storyPage} key={storyPage.pageNumber} book={this.book} onExiting={this.onExiting} onExited={this.onExited} forcePageHeight={this.isFirstPageInitialized} />
        );
      });

    return (
      <StoryCarousel activeIndex={this.state.activeIndex} slides={slides} storyPages={this.state.storyPages} next={this.next} previous={this.previous} goToIndex={this.goToIndex} arePagesInitialized={this.arePagesInitialized}/>
    );
  }
}


export default StoryReader;
