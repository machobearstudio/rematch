declare const reactNavigationPlugin: ({ Routes, initialScreen, sliceState }: {
    Routes: any;
    initialScreen: any;
    sliceState?: (state: any) => any;
}) => {
    Navigator: any;
    reactNavigationPlugin: {
        config: {
            redux: {
                middleware: any[];
                reducers: {
                    nav: any;
                };
            };
        };
        onStoreCreated(): void;
    };
};
export default reactNavigationPlugin;
