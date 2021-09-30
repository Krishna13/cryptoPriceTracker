import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel, ChartXLabel } from '@rainbow-me/animated-charts';

export const { width: SIZE } = Dimensions.get('window');


const Chart = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline }) => {

    const priceChangeColor = priceChangePercentage7d > 0 ? 'green' : 'red'

    const formatUSD = value => {
        'worklet';
        if (value === '') {
            return `$${currentPrice.toLocaleString('en-IND', { currency: 'USD' })}`;
        }
        const formattedValue = `$${parseFloat(value).toFixed(2)}`
        return formattedValue;
    };
    const formatDatetime = value => {
        'worklet';
        if (value === '') {
            return 'Date-Time';
        }
        const date = new Date(Number(value * 1000));
        const s = date.getSeconds();
        const m = date.getMinutes();
        const h = date.getHours();
        const d = date.getDate();
        const n = date.getMonth();
        const y = date.getFullYear();
        return `${y}-${n}-${d} ${h}:${m}:${s}`;
    };


    return (
        <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
            <View style={styles.chartWrpper}>
                <View style={styles.titleWrapper}>
                    <View style={styles.upperTitles}>
                        <View style={styles.upperLeftTitle}>
                            <Image source={{ uri: logoUrl }} style={{ width: 24, height: 24, marginRight: 4 }} resizeMode={'cover'} />
                            <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
                        </View>
                        <Text style={[styles.title, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
                    </View>
                    <View style={styles.lowerTitles}>
                        <ChartYLabel
                            format={formatUSD}
                            style={styles.boldTitle}
                        />
                        <ChartXLabel
                            format={formatDatetime}
                            style={{ color: 'green', margin: 4 }}
                        />
                        {/* <Text style={styles.boldTitle}>${currentPrice.toLocaleString('en-IND', { currency: 'USD' })}</Text> */}
                        {/* <Text style={[styles.title, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text> */}

                    </View>
                </View>
                <View style={styles.chartLineWrapper}>
                    <ChartPath height={SIZE / 2} stroke="black" width={SIZE} strokeWidth="1.5"/>
                    <ChartDot style={{ backgroundColor: 'green' }} />
                </View>
            </View>
        </ChartPathProvider>
    )
}

const styles = StyleSheet.create({

    chartWrpper: {
        marginVertical: 16
    },
    titleWrapper: {
        marginHorizontal: 16
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upperLeftTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#A9ABB1'

    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boldTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#000"
    },
    title: {
        fontSize: 18
    },
    chartLineWrapper: {
        marginTop: 20
    }
})

export default Chart
