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

class StoryReader extends Component {

  book =
  {
    title: "Test",
    authorName: "Test",
    bookText: "Test"
  };

  pageTextCharLength = 1000;


  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      storyPages: []
    };

    this.book.title = this.props.storySection.title;
    this.book.authorName = this.props.authorName;
    this.book.bookText = this.props.storySection.text;

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.initializePages = this.initializePages.bind(this);

    this.initializePages(this.book.bookText);

  }

  initializePages(bookText) {
    var upperBound = 0;
    var lowerBound = 0;
    var index = 0;
    while (lowerBound<bookText.length) {
      //if we can fit the rest of the story on this page, do it.
      if (lowerBound + this.pageTextCharLength > bookText.length-1) {
        upperBound = bookText.length;
      }
      //otherwise get the next pageTextCharLength characters
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
          pageNumber: index+1,
          //get the text on the page
          pageText: bookText.substring(lowerBound, upperBound)
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
    const { activeIndex } = this.state;
    const heightStyle = {height: '100%'};

    const slides = this.state.storyPages.map((storyPage) => {
      return (
      		<CarouselItem
            style={heightStyle}
	          onExiting={this.onExiting}
	          onExited={this.onExited}
	          key={storyPage}
	        >
	          <Card style={heightStyle}>
	          	<CardBody>
		          <CardTitle className="story-title">{this.book.title}</CardTitle>
		          <CardSubtitle className="story-subtitle">{this.book.authorName}</CardSubtitle>
		          <CardText className="mt-3">{storyPage.pageText}</CardText>
              <CardSubtitle className="story-subtitle   text-muted">{"Page " + storyPage.pageNumber}</CardSubtitle>
		        </CardBody>
	          </Card>

	        </CarouselItem>
      );
    });

    return (
    	<div style={heightStyle}>
    		<Carousel
    		    className="story-reader"
            style={heightStyle}
		        activeIndex={activeIndex}
		        next={this.next}
		        previous={this.previous}
		        interval={false}
		      >
		        <CarouselIndicators items={this.state.storyPages} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
		        {slides}
		        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
		        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
		      </Carousel>
    	</div>

    );
  }
}


export default StoryReader;
