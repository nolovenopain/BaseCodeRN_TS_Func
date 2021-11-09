import React from 'react';
import deviceInfoModule from "react-native-device-info"
import { badRequest, notFound, notPermission, otherError, serverError, sessionExpired } from "./errors"
import { Text } from "react-native"
import { Dimensions } from "../Constants"

export const hasNotch = () => {
    return deviceInfoModule.hasNotch()
}

export const noDataView = () => {
    return (
        <Text 
            style={{
                color: 'gray',
                fontSize: 20,
                marginTop: Dimensions.height / 5
            }} 
        >
            Không có dữ liệu
        </Text>
    )
}

export const checkStatus = async(res: any) => {  
    var data = null
    switch (res.status) {
        case 200:
            const resp = await res.json();
            data = resp.Data
            if(data) {
                if(resp.code == 200) {
                    data = resp.Data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else {
                data = resp
            }
            break;
        case 401:
            sessionExpired()
            break;
        case 400: 
            badRequest()
            break;
        case 403: 
            notPermission()
            break;
        case 404: 
            notFound()
            break;
        case 500: 
            serverError()
            break;
        default:
            otherError()
            break;
    }
    return data
}
