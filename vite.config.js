export default{
    base : '/',
    build : {
        rollupOptions :{
            input:{
                main: './index.html',
                chart : './src/chart.html'
            },
        },
    },
};
