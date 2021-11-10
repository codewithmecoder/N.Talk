import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root:{
    padding: 10,
  },
  row:{
    flexDirection: "row"
  },
  inputContainer:{
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  input:{
    flex: 1,
    marginHorizontal: 5,
  },
  icon:{
    marginHorizontal: 5,
  },
  buttonContainer:{
    width: 40,
    height: 40,
    backgroundColor: '#3777f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: 'white',
    fontWeight: '800',
    fontSize: 35,
  },
  image:{
    width: "50%",
    height: 150,
    borderRadius: 10
  },
  sendImageContainer:{
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10
  }
})

export default styles;