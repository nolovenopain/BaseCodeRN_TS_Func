import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image as ImageRN, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { errorImage } from '../Constants';
import Config from "react-native-config";

interface ImageCus {
    source: any
    autoHeight?: boolean
    style: any
    indicatorSize?: any
    indicatorColor?: string
    resizeMode?: any
}

export const ImageCus: React.FC<ImageCus> = ({
    source = null,
    autoHeight = false,
    style,
    indicatorSize = 'small',
    indicatorColor = 'rgba(0,0,0,0.4)',
    resizeMode = 'contain'
}) => {
    const genericUri = (uri: string) => {
        // if (!uri.startsWith('http')) {
        //     if (uri.startsWith('/')) {
        //         uri = uri.replace('/', '');
        //     }
        //     uri = Config.DEV_BASE_URL + uri;
        // }
        return uri;
    }

    const [isLoaded, setIsLoaded] = useState(false)
    const [isError, setIsError] = useState(false)
    const [width, setWidth] = useState(60)
    const [height, setHeight] = useState(60)

    useEffect(() => {
        loading()
    }, [])

    const loading = () => {
        try {
            if (source.constructor == Number) {
                setIsLoaded(true)
                setIsError(false)
            }
            else if(source.uri.constructor == String) {
                var uri = genericUri(source.uri)

                ImageRN.prefetch(uri).then((status) => {
                    if (autoHeight) {
                        ImageRN.getSize(uri, (w, h) => {
                            console.log(w, h);
                            setIsLoaded(status)
                            setIsError(false)
                            setWidth(w)
                            setHeight(h)
                        });
                    }
                    else {
                        setIsLoaded(status)
                        setIsError(false)
                    }
                }, (error) => {
                    setIsError(true)
                })
            }
        } catch (error) { 
            setIsError(true)
        }
    }

    var style = StyleSheet.flatten(style)

    return (
        isError ?
            <FastImage
                source={errorImage}
                style={{
                    width: style.width,
                    height: style.height,
                }}
            />
            : !isLoaded ?
                <View 
                    style={{
                        width: style.width,
                        height: style.height,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ActivityIndicator 
                        color={indicatorColor} 
                        size={indicatorSize} 
                    />
                </View>
                    :
                <FastImage
                    resizeMode={resizeMode}
                    style={[
                        {},
                        style,
                    ]}
                    source={source}
                />
    )
}
