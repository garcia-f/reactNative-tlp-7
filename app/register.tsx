import RegisterForm from "@/components/registerForm";
import { View } from "react-native";

export default function Register() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <RegisterForm />
        </View>
    )
}