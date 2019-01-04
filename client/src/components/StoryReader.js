import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText
} from 'reactstrap';


function StoryCarouselItem(props) {
  let storyPage = props.storyPage;
  let heightStyle = {height: '100%'};
  let textHeightStyle = {height: '85%'};

  console.log(props);

  return (

      <CarouselItem
        onExiting={props.onExiting}
        onExited={props.onExited}
        // key={storyPage.pageNumber}
        className={props.in ? "active" : ""}
        style={heightStyle}
      >
        <Card style={heightStyle}>
          <CardBody id="StoryReaderCardBody" style={heightStyle} className="mx-3">
            <CardTitle className="story-title">{props.book.title}</CardTitle>
            <CardSubtitle className="story-subtitle">{props.book.authorName}</CardSubtitle>
            <CardText style={textHeightStyle} className="mt-3 mx-2">{props.storyPage.pageText}</CardText>
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
            className = "story-reader"
            style = {heightStyle}
            activeIndex = {props.activeIndex}
            next = {props.next}
            previous = {props.previous}
            interval = {false}
          >
          <CarouselIndicators items={props.storyPages} activeIndex={props.activeIndex} onClickHandler={props.goToIndex} />
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

  pageTextCharLength = 2000;

  pageTextPercentDecimal = .85;
  pageTextPercentLowerBoundDecimal = .75;

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
    this.initializePages = this.initializePages.bind(this);
    this.doesTextFitPage = this.doesTextFitPage.bind(this);
    this.getNewlineText = this.getNewlineText.bind(this);

    this.book.title = this.props.storySection.title;
    this.book.authorName = this.props.author.authorName;
    this.book.bookText = this.props.storySection.text;

    this.initializePages(this.book.bookText);
  }

  doesTextFitPage(text) {
    //get the story reader's height and element
    var storyReaderElement = document.getElementById("RouterId");
    var storyReaderHeight = storyReaderElement.clientHeight;

    //converts the given text into spans containing the lines of text.
    text = this.getNewlineText(text);

    //create a test element to append to the story reader
    var testPage = React.createElement("CardText", {id: "testPageId", className: "mt-3 mx-2"}, text);
    //testPage.innerHTML = text;

    //append the test element to the story reader
    storyReaderElement.appendChild(testPage);

    //get the test element's height
    var testPageElement = document.getElementById("testPageId");
    var testPageHeight = testPageElement.clientHeight;

    //remove this test element from the document
    testPageElement.parentNode.removeChild(testPageElement);

    var heightDecimal = testPageHeight / storyReaderHeight;

    //return if this pages height percentage is within our accepted bounds.
    return heightDecimal >= this.pageTextPercentLowerBoundDecimal && heightDecimal <= this.pageTextPercentDecimal;
  }

  getNewlineText(text) {
    //return text;
    return (
      <div>
        {
          text.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
          })
        }
      </div>
    )
  }

  initializePages(bookText) {
    var upperBound = 0;
    var lowerBound = 0;
    var index = 0;
    while (lowerBound < bookText.length) {
      //if we can fit the rest of the story on this page, do it.
      //if (this.doesTextFitPage(bookText.substring(lowerBound, bookText.length))) {
        //upperBound = bookText.length;
      //}
      if (lowerBound + this.pageTextCharLength > bookText.length - 1) {
        upperBound = bookText.length;
      }
      //otherwise get the next characters to display on this page
      else {
        upperBound = lowerBound + this.pageTextCharLength;
        if (upperBound > bookText.length) {
          upperBound = bookText.length;
        }
        else {
          //additionally, add characters until the end of the word is found.
          while(bookText.charAt(upperBound) !== ' ') {
            upperBound++;
            //upperbound can go up to length, because it is the location to the
            //right of the last character in the string
            if (upperBound > bookText.length) {
              upperBound = bookText.length;
              break;
            }
          }
        }
      }
      this.state.storyPages.push(
        {
          //get index
          pageNumber: index + 1,
          //get the text on the page
          pageText: this.getNewlineText(bookText.substring(lowerBound, upperBound))
        }
      );
      lowerBound = upperBound;
      index++;
    }
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

  render() {

    let slides =
      this.state.storyPages.map((storyPage) => {
        return (
          <StoryCarouselItem storyPage={storyPage} key={storyPage.pageNumber} book={this.book} onExiting={this.onExiting} onExited={this.onExited} />
        );
      });

    return (
      <StoryCarousel activeIndex={this.state.activeIndex} slides={slides} storyPages={this.state.storyPages} next={this.next} previous={this.previous} goToIndex={this.goToIndex}/>
    );
  }
}


export default StoryReader;
