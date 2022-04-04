import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
  Alert,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
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
import {navigate} from '../../helpers/Navigasi';

export default function Home({navigation}) {
  const {loading, refreshing, connection} = useSelector(state => state.global);
  const {popularBook, recommendedBook} = useSelector(state => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    getListBook();
    exit();
  }, []);

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
  console.log('recomende', recommendedBook);

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
  // const recommended = listBook
  //   .filter(function (item) {
  //     return item.vote_average >= 5;
  //   })
  //   .sort(function (a, b) {
  //     return b.vote_average - a.vote_average;
  //   });

  const recommended = recommendedBook.sort(function (a, b) {
    return b.average_rating - a.average_rating;
  });
  const sortedrecommended = recommended.slice(0, 6);

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
        <Monserrat textAlign="center" color="white">
          {item.title}
        </Monserrat>
      </View>
    );
  };

  const PopularBooks = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 150,
          alignItems: 'center',
          backgroundColor: '#23324b',
          marginVertical: 5,
          borderRadius: 10,
        }}
        onPress={() => {
          getBookDetails(item.id);
        }}>
        <Image
          style={{
            flex: 1,
            height: ms(100),
            width: ms(100),
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
            <Monserrat color="white" size={15}>
              {item.title}
            </Monserrat>
            <Monserrat color="white" type="Bold">
              {item.author}
            </Monserrat>
            <Monserrat color="white">{item.publisher}</Monserrat>

            <Monserrat color="white" size={12} marginTop={5}>
              <FontAwesome name="star" color="yellow" size={15} />{' '}
              {item.average_rating}
            </Monserrat>

            <Monserrat color="white" size={12} marginTop={5}>
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
        <Header />

        <Monserrat color="white" size={16}>
          Recommended Books
        </Monserrat>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={sortedrecommended}
          keyExtractor={(item, index) => index}
          renderItem={RecommendedBooks}
          ListEmptyComponent={<Monserrat>No Data Found</Monserrat>}
          horizontal
        />

        <Monserrat color="white" size={16} marginTop={-10}>
          Popular Books
        </Monserrat>

        <FlatList
          data={popularBook}
          keyExtractor={(item, index) => index}
          renderItem={PopularBooks}
          ListEmptyComponent={<Monserrat>No Data Found</Monserrat>}
        />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        {connection ? renderHome() : navigation.navigate('NoConnect')}
        {loading ? <Loading /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    backgroundColor: '#1C222B',
  },
});
