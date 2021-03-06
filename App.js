import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

import Deck from './src/deck';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
];

export default () => {
  const renderCard = (item) => {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text>I can customize</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#0389f4"
          title="View Now"
        ></Button>
      </Card>
    );
  };

  const renderNoMoreCard = () => {
    return (
      <Card title="No Cards">
        <Text>You swiped all cards</Text>
        <Button
          icon={{ name: 'code' }}
          backgroundColor="#0389f4"
          title="Get More"
        ></Button>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeLeft={() => null}
        onSwipeRight={() => null}
        renderNoMoreCard={renderNoMoreCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
});
