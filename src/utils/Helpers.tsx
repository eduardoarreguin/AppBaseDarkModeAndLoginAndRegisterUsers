export const validateEmail = (email: string) => {
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const djangoEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return basicEmailRegex.test(email) && djangoEmailRegex.test(email);
};
