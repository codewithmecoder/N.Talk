import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // container: {
  //   padding:10,
  //   margin: 10,
  //   borderRadius: 10,
  //   maxWidth: '75%',
  // },
  leftContainer:{
    // backgroundColor: '#3777f0',
    marginLeft: 10,
    marginRight: 'auto'
  },
  rightContainer:{
    // backgroundColor: 'lightgrey',
    marginLeft: 'auto',
    marginRight: 10
  },
  textContainer:{
    padding:10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  leftText:{
    backgroundColor: '#3777f0',
  },
  rightText:{
    backgroundColor: 'lightgrey',
  },
  imgContainer:{
    width: 'auto',
    height: 'auto',
    backgroundColor: '#bdc3c7',
    borderRadius: 20
  }
});
export default styles;