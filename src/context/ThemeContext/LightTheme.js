import { createTheme } from '@rneui/themed';

export const lightTheme = createTheme({
    components:{
        Text:(props,theme)=>({
            style:{
                color: '#121212',
                marginHorizontal: 10

            }
        }), 
        Button:(props,theme)=>({
            buttonStyle:{
                backgroundColor: 'rgb(252,134,8)',
                //backgroundColor: '#2185D0',
                marginHorizontal: 10,
                borderRadius: 4,

            },
            titleStyle:{
                color:'#f5f5f5'
            }
        })
    },
    Default:{
            background: "#fff",
            backgroundSecondary: '#E3E3E3',
            backgroundTerciary: '#121212',
            border: '#000',
            red: 'red',
            textSecondary: '#404040'


    },
    Text:{
        style:{
            color: '#121212'
        }
    },
    Icon:{
        iconStyle:{
            color: '#000'
        }
    },
    Input:{
        style:{
            color: '#000'
        }
    },
    Button:{
        buttonStyle:{
            backgroundColor: 'red'
        }
    }
}); 