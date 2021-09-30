import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {

    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red'

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                {/* Left Side */}
                <View style={styles.leftWrapper}>
                    <Image source={{ uri: logoUrl }} style={styles.image}></Image>
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
                    </View>
                </View>
                {/* Right Side */}
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>${currentPrice.toLocaleString('en-IND', {currency: 'USD'})}</Text>
                    <Text style={[styles.subTitle, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 38,
        width: 38
    },
    titlesWrapper: {
        marginLeft: 8,
    },
    rightWrapper: {
        alignItems: "flex-end"
    },
    title: {
        fontSize: 18
    },
    subTitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#A9ABB1"
    },
})

export default ListItem
