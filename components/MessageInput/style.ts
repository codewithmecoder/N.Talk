import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root:{
    flexDirection: 'row',
    padding: 10
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
  }
})

export default styles;