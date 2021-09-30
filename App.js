import { StatusBar } from 'expo-status-bar';
import React, { useRef, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from './components/ListItem';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { SAMPLE_DATA } from './assets/data/sampleData'

import Chart from './components/Chart';

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
)

export default function App() {


  const [selectedCoinData, setselectedCoinData] = useState(null)



  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['48%'], []);

  const openModal = (item) => {
    setselectedCoinData(item)
    bottomSheetModalRef.current.present();
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>


        <FlatList
          keyExtractor={(item) => item.id}
          data={SAMPLE_DATA}
          renderItem={({ item }) => (
            <ListItem name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}

        />

        <StatusBar backgroundColor="#000" barStyle="dark-content" />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}>

        {selectedCoinData ? (<Chart 
        currentPrice={selectedCoinData.current_price}
        logoUrl={selectedCoinData.image}
        name={selectedCoinData.name}
        symbol={selectedCoinData.symbol}
        priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
        sparkline={selectedCoinData.sparkline_in_7d.price}
        
        />):null }
      </BottomSheetModal>

    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  titleWrapper: {
    marginTop: 45,
    paddingHorizontal: 16
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: .5,
    shadowRadius: 4,
    elevation: 5,
  }
});
