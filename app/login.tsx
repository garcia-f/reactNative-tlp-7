import LoginForm from "@/components/loginForm";
import { View } from "react-native";

export default function Login() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <LoginForm/>
        </View>
    );
}