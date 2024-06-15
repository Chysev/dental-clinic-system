import { Link } from "expo-router";
import { StyledComponent } from "nativewind";
import { View, Text } from "react-native";

const index = () => {
  return (
    <View className="h-full flex w-full justify-center items-center bg-gray-50 px-4">
      <View className="max-w-[350px] w-full p-8 bg-white rounded-xl shadow-xl items-center">
        <Text className="text-[36px] font-[Poppins] text-gray-900 font-extrabold mb-4">
          Dental Clinic
        </Text>
        <Text className="text-[18px] font-[Poppins] text-gray-600 text-center mb-6">
          Experience the best dental care with our professional team and
          state-of-the-art facilities.
        </Text>

        <StyledComponent
          href="/register"
          component={Link}
          tw="border-[1px] shadow-lg bg-[#007BFF] border-transparent text-white py-4 text-[18px] w-full text-center rounded-lg mb-4"
        >
          Book Now!
        </StyledComponent>

        <Text className="text-[14px] font-[Poppins] text-gray-500 text-center">
          Already have an account?
          <Link href="/login" className="text-[#007BFF]">
            {" "}
            Sign in
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default index;
