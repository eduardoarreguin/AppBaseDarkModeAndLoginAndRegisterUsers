import { createTheme  } from '@rneui/themed';

export const darkTheme = createTheme({
    components:{
        Text:(props,theme)=>({
            style:{
                color: '#f5f5f5',
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
                color:'#F5F5F5'
            }
        }),


        
    },
    Default:{
            background: "#121212",
            backgroundSecondary: '#1F1F1F',
            backgroundTerciary: '#f5f5f5',
            border: '#3B3B3B',
            red: 'red',
            textSecondary: '#C0C0C0'
    },
    Text:{
        style:{
            color: '#f5f5f5'
        }
    },
    Icon:{
        iconStyle:{
            color: '#fff'
        }
    },
    Input:{
        style:{
            color: '#fff'
        }
    },
    Button:{
        buttonStyle:{
            background: 'red'
            //backgroundColor: '#2185D0'
        }
    }
}); 