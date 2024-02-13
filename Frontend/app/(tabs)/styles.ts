import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EC769A',
    paddingTop: 30,
  },
  form: {
    backgroundColor: '#EC769A',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4DD',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#535454',
  },
  nameInput: {
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F4F4DD',
  },
  bioInput: {
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F4F4DD',
  },
  logo: {
    width: 180,
    height: 70,
    position: 'absolute',
    top: -40,
    // left: 10,
  },
  modalContainer: {
    backgroundColor: '#EC769A',
    borderRadius: 10,
    width: '85%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignSelf: 'center',
    paddingHorizontal: 20,
    margin: 50,
  },
  modalContent: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    color: '#F4F4DD',
    paddingBottom: 20,
  },
  spinnerTextStyle: {
    color: '#F4F4DD',
  },
  error: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    color: '#F4F4DD',
  },
});

export default styles;
