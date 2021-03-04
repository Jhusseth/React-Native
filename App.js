/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Animated} from 'react-native';
import {DogImage} from './components/Images';
import axios from 'axios';
import {Button, ButtonGroup, Grid, Typography} from '@material-ui/core';
let response;
export default function App() {
  const [text, setText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [numberOfDogs, setNumberOfDogs] = useState(3);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function reverseString(str) {
    let splitString = str.split('');
    let reverseArray = splitString.reverse();
    let joinArray = reverseArray.join('');
    return joinArray;
  }
  const reverseText = reverseString(text);
  useEffect(() => {
    async function fetch() {
      response = (
        await axios.get(
          `https://dog.ceo/api/breeds/image/random/${numberOfDogs}`,
        )
      ).data.message;
      if (response) {
        setIsUploading(false);
        setIsUploading(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 10000,
        }).start();
      }
    }
    fetch();
  }, [numberOfDogs]);
  return (
    <View style={styles.container}>
      <Typography variant="h1" component="h1">
        Welcome
      </Typography>
      <TextInput
        style={styles.input}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <ButtonGroup
        style={{marginBottom: 10}}
        variant="contained"
        color="primary"
        aria-label="contained primary button group">
        <Button
          onClick={() => {
            setNumberOfDogs(1);
          }}>
          One
        </Button>
        <Button
          onClick={() => {
            setNumberOfDogs(2);
          }}>
          Two
        </Button>
        <Button
          onClick={() => {
            setNumberOfDogs(3);
          }}>
          Three
        </Button>
      </ButtonGroup>
      <Typography style={{marginBottom: 10}} variant="h4" className={styles.header}>   {reverseText}</Typography>
      <Animated.View style={{opacity: fadeAnim}}>
        <Grid container direction="row" spacing={20}>
          {isUploading
            ? response.map((item) => {
                console.log(item);
                return <DogImage key={item} url={item} />;
              })
            : null}
        </Grid>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  advisorName: {
    width: 500,
    fontWeight: 'bold',
    fontSize: 200,
    color: 'black',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 200,
    fontWeight: 'bold',
    margin: 20,
  },
  popper: {
    transform: 'translate3d(9px, 22px, 0px) !important',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    width: 1000,
    height: 500,
  },
  input: {
    border: '1px solid black',
    margin: 20,
  },
});
