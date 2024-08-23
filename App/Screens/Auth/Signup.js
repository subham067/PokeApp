import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, Pressable } from 'react-native';
import AppButton from '../../Components/GloblalComp/AppButton';
import AppTextInput from '../../Components/GloblalComp/AppTextInput';
import { COLORS } from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Container from '../../Components/GloblalComp/Container';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import NavigationService from '../../Services/Navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/User';
import AuthService from '../../Services/Auth';

const Signup = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfromPassVisible, setIsConfromPassVisible] = useState(false)
    const [LoderStatus, setLoderStatus] = useState(false)

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!/^[0-9]{10}$/.test(mobile)) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
            isValid = false;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            newErrors.email = 'Enter a valid email address';
            isValid = false;
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }


        return newErrors;
    };
    const isValidFrom = validateForm()

    const handleSignup = async () => {


        if (LoderStatus) return

        setLoderStatus(true);

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            let userDetails = {
                uid: user.uid,
                name: name,
                mobile: mobile,
                email: email,
                createdAt: new Date().getTime(),
            }
            // Save user data to Firestore
            await firestore().collection('users').doc(user.uid).set(userDetails);
            dispatch(setUser(userDetails));
            AuthService.setAccount(userDetails)
            Toast.show({
                type: 'success',
                text1: 'Signup Successful',
                text2: 'You have successfully signed up!',
            });

        } catch (error) {
            let errorMessage = 'Signup failed. Please try again later.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'That email address is already in use!';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is invalid!';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak!';
            }

            Toast.show({
                type: 'error',
                text1: 'Signup Error',
                text2: errorMessage,
            });
        } finally {
            setLoderStatus(false); // Hide loader
        }
    };

    return (
        <Container>
            <Text style={styles.welcomeText}>
                Hello! {'\n'}Welcome to the app
            </Text>
            <AppTextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                error={name && isValidFrom.name}
            />
            <AppTextInput
                leftIcon={<Text style={styles.countryCodeText}>+ 91</Text>}
                maxLength={10}
                keyboardType='number-pad'
                placeholder="Enter your mobile number"
                value={mobile}
                onChangeText={setMobile}
                error={mobile && isValidFrom.mobile}
            />
            <AppTextInput
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                error={email && isValidFrom.email}
            />
            <AppTextInput
                placeholder="Create login password"
                value={password}
                onChangeText={setPassword}
                rightIcon={
                    <Icon
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={20}
                        color={COLORS.primaryFontColor}
                    />
                }
                onRightIconPress={() => setIsPasswordVisible(s => !s)}
                secureTextEntry={!isPasswordVisible}
                error={password && isValidFrom.password}
            />
            <AppTextInput
                placeholder="Retype login password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                rightIcon={
                    <Icon
                        name={isConfromPassVisible ? "eye" : "eye-off"}
                        size={20}
                        color={COLORS.primaryFontColor}
                    />
                }
                onRightIconPress={() => setIsConfromPassVisible(s => !s)}
                secureTextEntry={!isConfromPassVisible}
                error={confirmPassword && isValidFrom.confirmPassword}
            />
            <AppButton
                title='Signup'
                containerStyle={styles.signupButton}
                onPress={handleSignup}
                disabled={Object.values(isValidFrom).length != 0}
                loader={LoderStatus}
            />
            <Pressable onPress={() => NavigationService.navigate("Login")} style={styles.loginTextContainer}>
                <Text style={styles.loginPromptText}>
                    Already have an account? {" "}
                </Text>
                <Text style={styles.loginLinkText}>
                    Login now!
                </Text>
            </Pressable>
            <View style={styles.termsContainer}>
                <AntDesign name="infocirlce" size={18} color={COLORS.secondaryFontColor} />
                <Text style={styles.termsText}>
                    You accept the <Text style={styles.linkText}>terms and conditions</Text> and <Text style={styles.linkText}>delivery policies</Text> of app by logging in.
                </Text>
            </View>
        </Container>
    );
};

export default Signup;

const styles = StyleSheet.create({
    welcomeText: {
        color: COLORS.primaryFontColor,
        fontSize: 30,
        fontFamily: FONTS.bold,
        marginHorizontal: moderateScale(15),
        marginTop: moderateScale(50),
    },
    countryCodeText: {
        fontSize: 16,
        color: COLORS.primaryFontColor,
        fontFamily: FONTS.regular,
    },
    signupButton: {
        marginTop: moderateScale(12),
    },
    loginTextContainer: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(15),
    },
    loginPromptText: {
        color: COLORS.primaryFontColor,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    loginLinkText: {
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
    wrapper: {
        marginTop: moderateScale(20),
        width: moderateScale(250),
        height: moderateScale(300),
        alignSelf: "center"
    },
    slide1: {
        width: moderateScale(250),
        height: moderateScale(250),
    },
});
