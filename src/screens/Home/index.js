import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './Header';
import {setRefresh, setConnection} from '../../reducer/globalAction';
import {getAllBook, getDetailBook} from './redux/action';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import Monserrat from '../../components/Monserrat';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rupiah} from '../../helpers/Rupiah';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/Loading';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home({navigation}) {
  const {loading, refreshing, connection} = useSelector(state => state.global);
  const {popularBook, recommendedBook} = useSelector(state => state.home);
  // const [sortedrecommended, setsortedrecommended] = useState([]);
  const {user} = useSelector(state => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    getListBook();
    exit();
  }, [connection]);

  const getListBook = () => {
    internetChecker();
    dispatch(getAllBook());
  };

  const getBookDetails = id => {
    dispatch(getDetailBook(id));
  };

  const onRefresh = () => {
    dispatch(setRefresh(true));
    getListBook();
    dispatch(setRefresh(false));
  };

  const internetChecker = () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      dispatch(setConnection(state.isConnected));
    });
  };
  const exit = () => {
    const backAction = () => {
      Alert.alert('Book App', 'Do you want to exit the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  const Button = ({children, ...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );

  const NoInternetModal = ({show, onRetry, isRetrying}) => (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <MaterialIcons name="wifi-off" size={50} color="black" />
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <Button onPress={onRetry} disabled={isRetrying}>
          Try Again
        </Button>
      </View>
    </Modal>
  );

  const sortedrecommended = recommendedBook.sort((a, b) => {
    return b.rating - a.rating;
  });
  const recommended = sortedrecommended.slice(0, 6);

  const RecommendedBooks = ({item}) => {
    return (
      <View
        style={{
          marginTop: 18,
          padding: 10,
          alignItems: 'center',
          marginVertical: 15,
          marginLeft: 5,
          maxWidth: ms(120),
          marginHorizontal: 5,
          backgroundColor: '#23324b',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            getBookDetails(item.id);
          }}>
          <Image
            style={{width: ms(100), height: ms(100), borderRadius: 10}}
            source={{uri: `${item.cover_image}`}}
          />
        </TouchableOpacity>
        <Monserrat type="Bold" color="white">
          {item.title}
        </Monserrat>
      </View>
    );
  };
  const PopularBooks = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width / 3 - 20,
          height: 300,
          alignItems: 'center',
          backgroundColor: '#23324b',
          marginVertical: 5,
          marginHorizontal: 5,
          borderRadius: 10,
          padding: 10,
        }}
        onPress={() => {
          getBookDetails(item.id);
        }}>
        <Image
          style={{
            flex: 1,
            width: ms(100),
            height: ms(300),

            borderRadius: 10,
            marginRight: 15,
            marginLeft: 15,
          }}
          source={{uri: item.cover_image}}
        />
        <View
          style={{
            flex: 2.5,
            paddingTop: 5,
            paddingBottom: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            <Monserrat type="Bold" color="white" size={15}>
              {item.title}
            </Monserrat>
            <Monserrat color="white">{item.author}</Monserrat>
            <Monserrat color="white">{item.publisher}</Monserrat>

            <Monserrat color="white" type="Bold" size={12} marginTop={5}>
              <FontAwesome name="star" color="yellow" size={15} />{' '}
              {item.average_rating}
            </Monserrat>

            <Monserrat color="orange" type="Bold" size={12} marginTop={5}>
              <IonIcons name="pricetag" color="white" size={15} />{' '}
              {Rupiah(item.price)}
            </Monserrat>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHome = () => {
    return (
      <View style={styles.container}>
        <Header name={user.user.name} />

        <FlatList
          style={{marginTop: 20}}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          ListHeaderComponent={() => (
            <>
              <Monserrat color="white" type="Bold" size={20}>
                Recommended Books
              </Monserrat>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recommended}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Monserrat color="white" size={16}>
                      No Data Available
                    </Monserrat>
                  </View>
                )}
                renderItem={RecommendedBooks}
              />
            </>
          )}
          ListFooterComponent={() => (
            <>
              <Monserrat color="white" type="Bold" size={20}>
                Popular Books
              </Monserrat>
              <FlatList
                data={popularBook}
                numColumns={3}
                style={{
                  width: Dimensions.get('window').width - 20,
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Monserrat color="white" size={16}>
                      No Data Available
                    </Monserrat>
                  </View>
                )}
                renderItem={PopularBooks}
              />
            </>
          )}
        />

        {connection ? null : (
          <NoInternetModal
            show={!connection}
            onRetry={getListBook}
            isRetrying={loading}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      {loading ? <Loading /> : null}
      {renderHome()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
    paddingBottom: 150,
    backgroundColor: '#1C222B',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
