import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC769A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4DD',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  placeholder: {
    color: '#F4F4DD',
    fontSize: 20,
  },
  smallPlaceholder: {
    fontSize: 14,
    color: '#F4F4DD',
  },
  nameInput: {
    margin: 15,
    marginBottom: 40,
    borderColor: 'black',
    borderWidth: 1,
    // width: '70%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F4F4DD',
  },
  bioInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    // width: '70%',
    height: 120,
    borderRadius: 10,
    backgroundColor: '#F4F4DD',
  },
  logo: {
    width: 180,
    height: 70,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  button: {
    backgroundColor: '#F4F4DD',
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
  },
})

export default styles
