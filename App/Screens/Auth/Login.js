import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppButton from '../../Components/GloblalComp/AppButton';
import AppTextInput from '../../Components/GloblalComp/AppTextInput';
import { COLORS } from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Container from '../../Components/GloblalComp/Container';
import Swiper from 'react-native-swiper';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationService from '../../Services/Navigation';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/User';
import AuthService from '../../Services/Auth';


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [LoderStatus, setLoderStatus] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Enter a valid email address';
            isValid = false;
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        return newErrors;
    };
    const isValidFrom = validateForm()

    const handleLogin = async () => {
        if (LoderStatus) return

        setLoderStatus(true); // Show loader

        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);

            const userId = userCredential.user.uid;

            // Fetch user data from Firestore
            const userDoc = await firestore().collection('users').doc(userId).get();

            console.log("userDoc", JSON.stringify(userDoc.data()));
            dispatch(setUser(userDoc.data()));
            AuthService.setAccount(userDoc.data())
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome back!',
            });

            // Navigation logic after successful login
        } catch (error) {
            console.log("error", error);

            let errorMessage = 'Login failed. Please try again later.';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is invalid!';
            }else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password';
            }

            Toast.show({
                type: 'error',
                text1: 'Login Error',
                text2: errorMessage,
            });
        } finally {
            setLoderStatus(false); // Hide loader
        }
    };

    return (
        <Container>
            <View style={styles.wrapper}>
                <Swiper showsButtons={false} activeDotColor={COLORS.primaryThemeColor}>
                    {[0, 1, 2].map(item => (
                        <View style={styles.slide} key={item}>
                            <Image
                                source={require("../../Assets/Images/Ellipse.png")}
                                style={styles.slideImage}
                            />
                        </View>
                    ))}
                </Swiper>
            </View>
            <AppTextInput
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                error={email && isValidFrom.email}
            />
            <AppTextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <Icon
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={20}
                        color={COLORS.primaryFontColor}
                    />
                }
                onRightIconPress={togglePasswordVisibility}
                secureTextEntry={!isPasswordVisible}
                error={password && isValidFrom.password}
            />
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            <AppButton
                title={'Login'}
                containerStyle={styles.loginButton}
                onPress={handleLogin}
                disabled={Object.values(isValidFrom).length != 0}
                loader={LoderStatus}
            />
            <Pressable onPress={() => NavigationService.navigate("Signup")} style={styles.signupTextContainer}>
                <Text style={styles.signupPromptText}>
                    Don’t have an account?{" "}
                </Text>
                <Text style={styles.signupLinkText}>
                    Signup now!
                </Text>
            </Pressable>
            <View style={styles.termsContainer}>
                <AntDesign name="infocirlce" size={18} color={COLORS.secondaryFontColor} />
                <Text style={styles.termsText}>
                    You accept the <Text style={styles.linkText}>terms and conditions</Text> and <Text style={styles.linkText}>delivery policies</Text> of the app by logging in.
                </Text>
            </View>
        </Container>
    )
}

export default Login;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: moderateScale(20),
        width: moderateScale(250),
        height: moderateScale(300),
        alignSelf: "center"
    },
    slide: {
        width: moderateScale(250),
        height: moderateScale(250),
    },
    slideImage: {
        width: moderateScale(250),
        height: moderateScale(250),
        borderRadius: moderateScale(125),
    },
    forgotPasswordText: {
        color: COLORS.primaryThemeColor,
        fontSize: 14,
        fontFamily: FONTS.regular,
        textAlign: "right",
        marginRight: moderateScale(15),
        marginTop: moderateScale(5),
    },
    loginButton: {
        marginTop: moderateScale(12),
    },
    signupTextContainer: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(15),
    },
    signupPromptText: {
        color: COLORS.primaryFontColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    signupLinkText: {
        color: COLORS.primaryThemeColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    termsContainer: {
        marginHorizontal: moderateScale(15),
        flexDirection: "row",
        marginTop: moderateScale(25),
    },
    termsText: {
        color: COLORS.secondaryFontColor,
        fontSize: 16,
        fontFamily: FONTS.regular,
        marginLeft: moderateScale(5),
    },
    linkText: {
        color: COLORS.primaryThemeColor,
    },
});
