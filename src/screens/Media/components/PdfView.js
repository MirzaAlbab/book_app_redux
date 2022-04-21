import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import Monserrat from '../../../components/Monserrat';
import Foundation from 'react-native-vector-icons/Foundation';
import {ms} from 'react-native-size-matters';

export default function PdfView() {
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };
  const [page, setPage] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);

  const nextPage = () => {
    if (page !== 0 && currentpage < page) {
      setCurrentpage(currentpage + 1);
    }
  };
  const previousPage = () => {
    if (page !== 0 && currentpage > 1) {
      setCurrentpage(currentpage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Monserrat
        alignSelf="flex-start"
        fontSize={20}
        color="white"
        marginTop={20}
        marginBottom={20}>
        Pdf
      </Monserrat>
      <Pdf
        source={source}
        page={currentpage}
        enablePaging
        onLoadComplete={(numberOfPages, filePath) => {
          setPage(numberOfPages);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <View style={styles.buttonContainer}>
        <Foundation
          name="previous"
          size={ms(30)}
          color="white"
          onPress={() => previousPage()}
        />
        <Monserrat color="white" fontSize={20}>
          {currentpage}/{page}
        </Monserrat>

        <Foundation
          name="next"
          size={ms(30)}
          color="white"
          onPress={() => nextPage()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: ms(500),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: ms(5),
  },
});
