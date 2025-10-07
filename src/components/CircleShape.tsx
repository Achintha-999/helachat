import { View } from "react-native";

interface Circle {
    width: number;
    height: number;
    borderRadius: number;
    fillcolor?: string;
    className?: string;
    topValue?: number;
    bottomValue?: number;
    leftValue?: number;
    rightValue?: number;
}

export default function CircleShape(c: Circle) {

    return (
        <View  className={`${c.className ?? ""} `}
        style={{
            width: c.width,
            height: c.height,
            borderRadius: c.borderRadius,
            position: 'absolute',
            ...(c.fillcolor !== undefined && { backgroundColor: c.fillcolor }),
            ...(c.topValue !== undefined && { top: c.topValue }),
            ...(c.bottomValue !== undefined && { bottom: c.bottomValue }),
            ...(c.leftValue !== undefined && { left: c.leftValue }),
            ...(c.rightValue !== undefined && { right: c.rightValue }),
            zIndex: 0
        }} >

        </View>
    );

}
