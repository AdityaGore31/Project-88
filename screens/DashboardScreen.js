import React, { Component } from "react"
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "../Navigation/DrawerNavigator";

export default function DashboardScreen() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}