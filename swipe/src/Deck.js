import React, {Component} from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 2;
const SWIPE_OUT_DURATION = 400;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {
    },
    onSwipeLeft: () => {
    },
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD)
          this.forceSwipe(true);
        else if (gesture.dx < -SWIPE_THRESHOLD)
          this.forceSwipe(false);
        else
          this.resetPosition();
      }
    });

    this.state = {panResponder, position, index: 0};
  }

  forceSwipe(right) {
    const x = (SCREEN_WIDTH + (SCREEN_WIDTH / 2)) * (right ? 1 : -1);
    Animated.timing(this.state.position, {
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(right));
  }

  onSwipeComplete(right) {
    const {onSwipeLeft, onSwipeRight, data} = this.props;
    const item = data[this.state.index];

    right ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({x: 0, y: 0});
    this.setState({index: this.state.index + 1});
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start();
  }

  getCardStyle() {
    const {position} = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg']
    });

    return {
      ...position.getLayout(),
      transform: [{rotate}]
    };
  }

  renderCards() {
    if(this.state.index >= this.props.data.length)
      return this.props.renderNoMoreCards();

    return this.props.data.map((item, i) => {
      if (i < this.state.index) return null;

      if (i === this.state.index) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}>
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;