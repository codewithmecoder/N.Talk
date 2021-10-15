import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  badgeContainer:{
    backgroundColor: '#3777f0',
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: 'absolute',
    left: 45,
    top: 10,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white'
  },
  badgeText:{
    color: 'white',
    fontSize: 12
  },
  rightContainer:{
    flex: 1,
    justifyContent: "center"
  },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text:{
    color: "gray"
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  }
});

export default styles;