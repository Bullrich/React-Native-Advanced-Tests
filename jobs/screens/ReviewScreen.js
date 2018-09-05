import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {connect} from 'react-redux';

class ReviewScreen extends Component {
  // React navigator looks at this object
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          backgroundColor='rgba(0,0,0,0)'
          color='rgba(0, 122, 255, 1)'
        />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  };

  renderLikedJobs() {
    return this.state.likedJobs.map(job => {
      return (
        <Card>
          <View style={{height: 200}}>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

function mapStatetoProps(state) {
  return {likedJobs: state.likedJobs};
}

export default connect(mapStatetoProps)(ReviewScreen);