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
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './Header';
import {setRefresh, setConnection} from '../../reducer/globalAction';
import {getAllBook, getDetailBook} from './redux/action';
import {ms} from 'react-native-size-matters';
import Monserrat from '../../components/Monserrat';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rupiah} from '../../helpers/Rupiah';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from '../../components/Loading';
import NetInfo from '@react-native-community/netinfo';
import {sortBook} from '../../helpers/Sortbook';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Home({navigation}) {
  const {loading, refreshing, connection} = useSelector(state => state.global);
  const {popularBook, recommendedBook} = useSelector(state => state.home);
  const [recommended, setrecommended] = useState(recommendedBook);
  const {user} = useSelector(state => state.login);

  const dispatch = useDispatch();
  useEffect(() => {
    getListBook();
    exit();
    setrecommended(sortBook(recommendedBook, 6));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListBook = () => {
    internetChecker();
    dispatch(getAllBook());
  };

  const getBookDetails = id => {
    internetChecker();
    dispatch(getDetailBook(id));
  };

  const onRefresh = () => {
    dispatch(setRefresh(true));
    getListBook();
    setrecommended(sortBook(recommendedBook, 6));
    dispatch(setRefresh(false));
  };

  const internetChecker = () => {
    NetInfo.fetch().then(state => {
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
  const Button = ({children, ...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );

  const PopularBooks = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width / 2 - 25,
          height: 350,
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
            width: ms(150),
            height: ms(150),
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header name={user.user.name} />
        {loading ? <Loading /> : null}

        <FlatList
          style={{marginTop: 20}}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          ListHeaderComponent={() => (
            <>
              <View>
                <Monserrat
                  color="white"
                  type="Bold"
                  size={20}
                  marginVertical={15}>
                  Recommended Books
                </Monserrat>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recommended}
                  renderItem={PopularBooks}
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
                />
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <>
              <Monserrat
                color="white"
                type="Bold"
                size={20}
                marginVertical={15}>
                Popular Books
              </Monserrat>
              <FlatList
                data={popularBook}
                renderItem={PopularBooks}
                numColumns={2}
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
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
