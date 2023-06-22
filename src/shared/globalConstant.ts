
export const globalConstant = {
    baseDevUrl: {
        loginUrl: 'https://cgfms-dev.central.co.th/auth-service/api/',
        authUrl: 'https://cgfms-dev.central.co.th/service-gateway/auth-service/api/',
        orderUrl: 'https://cgfms-dev.central.co.th/service-gateway/sprint-connect-order-service/api/',
    },
    googleClientId: '139260687350-qcqr0j9bhj603bmh6tbb8ksfqq5q4m3j.apps.googleusercontent.com',
    facebookClientId: '174484468843972',
    key: 'A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQ',
    iv: 'r4t7w!z%C*F-JaNd',
    emailPattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    passwordPattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_+><?:;]).{8,}$',
    generatePasswordPattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_+><?:;]).{8}$',
    phoneNoPattern: /^[0-9]{10}$/,
    userCodePattern: '^[a-zA-Z0-9]{1,15}$',
    datePattern: /^\d{4}-\d{2}-\d{2}$/,
    exampleImageProfile: 'https://www.showplacerents.com/img/user-placeholder.png',
    exampleImage: 'https://www.keycdn.com/img/support/image-processing.png',
} as const;
