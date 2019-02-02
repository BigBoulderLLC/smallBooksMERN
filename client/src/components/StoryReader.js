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
  let textHeightStyle = {height: '82%'};

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
            <CardSubtitle className="story-subtitle mb-4">{props.book.authorName}</CardSubtitle>
            <CardText id="StoryReaderCardText" style={props.forcePageHeight ? textHeightStyle : {}} >{props.storyPage.pageText}</CardText>
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

  charsToSkipAtStartOfPage = " \t\n"

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
    this.getPageTextHeight = this.getPageTextHeight.bind(this);

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
        pageText: ""
      }
    );
  }

  //initializes all pages such that they will all fit within the given screen size
  initializePages() {

    let bookText= this.book.bookText;

    //ensure that the empty first page is not included in the final list of pages;
    if (!this.isFirstPageInitialized) {
      this.state.storyPages = [];
    }


    let upperBound = 0;
    let lowerBound = 0;
    let index = this.state.storyPages.length;

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
      let currentLength = Math.ceil(this.pageTextMaxCharLength/2);
      let searchUpper = this.pageTextMaxCharLength;
      let searchLower = 0;

      let targetHeightHit = false;
      let hitInt;

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
          let newCurrentLength = Math.ceil((currentLength + searchUpper)/2);
          if (currentLength === newCurrentLength) {
            targetHeightHit = true;
          }
          currentLength = newCurrentLength;
        }
        if (hitInt > 0) {
          //this is our new upper bound;
          searchUpper = currentLength;
          let newCurrentLength = Math.ceil((currentLength + searchLower)/2);
          if (currentLength === newCurrentLength) {
            targetHeightHit = true;
          }
          currentLength = newCurrentLength;
        }
        if (hitInt === 0) {
          targetHeightHit = true;

        }

        if (targetHeightHit) {

          let targetHeight = this.getPageTextHeight(bookText.substring(lowerBound, upperBound));

          let previousUpperBound;
          while (true) {
            previousUpperBound = upperBound;

            //ensure we don't go past the final character
            if (upperBound === bookText.length) {
              break;
            }

            //continue to the next space
            upperBound++;
            while(bookText.charAt(upperBound) !== ' ' && bookText.charAt(upperBound) !== '\n') {
              upperBound++;
              //upperbound can go up to length, because it is the location to the
              //right of the last character in the string
              if (upperBound > bookText.length) {
                upperBound = bookText.length;
                break;
              }
            }

            let newHeight = this.getPageTextHeight(bookText.substring(lowerBound, upperBound));

            //check if we've gone too far, and take the previous one if so
            if (newHeight > targetHeight) {
              upperBound = previousUpperBound;
              break;
            }

          }

          //console.log(bookText.substring(lowerBound,upperBound));
        }

      }

    }

    let pageText = this.getNewlineText(bookText.substring(lowerBound, upperBound));

    this.state.storyPages.push(
      {
        //get index
        pageNumber: index + 1,
        //get the text on the page
        pageText: pageText
      }
    );

    //iterate past any newlines or spaces at the start of a page
    while(upperBound < bookText.length && this.charsToSkipAtStartOfPage.includes(bookText.charAt(upperBound))) {
      //console.log(upperBound);
      upperBound++;
    }

    this.book.bookText = bookText.substring(upperBound, bookText.length);

    this.isFirstPageInitialized = true;
    this.arePagesInitialized = !this.book.bookText;

    //console.log("Page Accepted");

    this.forceUpdate();
  }

  measureText(pText, rootElement, pFontSize, pStyle, width) {
    let lDiv = document.createElement('div');

    rootElement.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }

    lDiv.style.className = "active carousel-item";

    lDiv.innerHTML = pText;

    //console.log("clientWidth: " + lDiv.clientWidth);

    let lResult = {
        width: (lDiv.clientWidth),
        height: (lDiv.clientHeight)
    };

    rootElement.removeChild(lDiv);
    lDiv = null;

    return lResult;
  }

  //returns 0 if the text fits the page. Returns 1 if its to large, and -1 if its too small
  doesTextFitPage(text) {
    //get the story reader's height and element
    let rootElement = document.getElementsByClassName("card-body")[this.state.activeIndex];
    let rootHeight = rootElement.scrollHeight;

    let pageTextHeight = this.getPageTextHeight(text);

    //console.log("pageHeight: " + rootHeight);
    //console.log("pageTextHeight: " + pageTextHeight);

    // get our height percent
    let heightDecimal = pageTextHeight / rootHeight;

    //return if this pages height percentage is within our accepted bounds.
    if (heightDecimal < this.pageTextPercentLowerBoundDecimal) {
      return -1;
    }

    if (heightDecimal > this.pageTextPercentDecimal) {
      return 1;
    }

    return 0;
  }

  getPageTextHeight(text) {
    let rootElement = document.getElementsByClassName("card-body")[this.state.activeIndex];
    let rootHeight = rootElement.scrollHeight;
    let pageTextElement = document.getElementsByClassName("card-text")[this.state.activeIndex];

    let style = window.getComputedStyle(pageTextElement, null).getPropertyValue('font-size');
    let fontSize = parseFloat(style);

    //split will not include empty strings between two newline characters
    let textArray = text.split('\n');

    let pageTextHeight = textArray.map((item) => {
      return this.measureText((item === "" ? "test" : item), rootElement, fontSize, pageTextElement.style, pageTextElement.style.width).height;
    }).reduce((a, b) => a + b, 0);

    return pageTextHeight;
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
