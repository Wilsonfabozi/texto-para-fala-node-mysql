import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme, Theme } from "@material-ui/core";
import { ptBR } from '@material-ui/core/locale';

import Dashboard from "./pages/dashboard/dashboard";
import Erro from "./pages/erro/erro";

export type RouterState = {
    tema: string;
}

class Router extends React.Component<Record<string, never>, RouterState> {
    tema: Theme = createMuiTheme({
        overrides: {
        },
    }, ptBR);;

    state = {
        tema: "tema-claro"
    }

    atualizaTema(): void {
        this.tema = createMuiTheme({
            overrides: {
                MuiAppBar: {
                    colorPrimary: {
                        color: this.state.tema === "tema-claro" ? "black" : "cornflowerblue",
                        backgroundColor: this.state.tema === "tema-claro" ? "#dadada" : "#0d0d14",
                        transition: "background-color 500ms ease-in-out 0s, color 500ms ease-in-out 0s"
                    }
                },
                MuiButton: {
                    contained: {
                        boxShadow: this.state.tema === "tema-claro" ?
                            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
                        :
                            "0px 3px 1px -2px rgb(0 0 139 / 20%), 0px 2px 2px 0px rgb(0 0 139 / 14%), 0px 1px 5px 0px rgb(0 0 139 / 12%)"
                        ,
                        '&:hover': {
                            boxShadow: this.state.tema === "tema-claro" ?
                                "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
                            :
                                "0px 2px 4px -1px rgb(0 0 139 / 20%), 0px 4px 5px 0px rgb(0 0 139 / 14%), 0px 1px 10px 0px rgb(0 0 139 / 12%)"
                            ,
                        }
                    },
                    label: {
                        color: this.state.tema === "tema-claro" ? "black" : "white",
                        // color: "inherit",
                        transition: "color 500ms ease-in-out 0s"
                    }
                },
                MuiIconButton: {
                    root: {
                        padding: 5,
                        color: "inherit"
                    }
                },
                MuiInputLabel: {
                    outlined: {
                        color: this.state.tema === "tema-claro" ? "black" : "cornflowerblue",
                        transition: "color 500ms ease-in-out 0s"
                    }
                },
                MuiFormLabel: {
                    root: {
                        '&.Mui-focused': {
                            color: this.state.tema === "tema-claro" ? "black" : "white",
                            transition: "color 500ms ease-in-out 0s"
                        }
                    }
                },
                MuiInputBase: {
                    root: {
                        color: this.state.tema === "tema-claro" ? "black" : "white",
                        transition: "color 500ms ease-in-out 0s"
                    },
                    input: {
                        color: this.state.tema === "tema-claro" ? "black" : "white",
                        transition: "color 500ms ease-in-out 0s"
                    }
                },
                MuiOutlinedInput: {
                    input: {
                        padding: "13px 12px",
                    },
                    notchedOutline: {
                        borderColor: this.state.tema === "tema-claro" ? "black !important" : "cornflowerblue !important",
                        transition: "border 500ms ease-in-out 0s"
                    }
                },
                MuiSvgIcon: {
                    root: {
                        color: "inherit"
                    }
                },
                MuiToolbar: {
                    root: {
                        justifyContent: "space-between",
                        transition: "box-shadow 500ms ease-in-out 0s",
                        boxShadow: this.state.tema === "tema-claro" ?
                            "0px 0px 20px -6px black"
                        :
                            "0px 0px 20px -6px darkblue"
                    },
                    regular: {
                        minHeight: "30px !important"
                    }
                }
                
            },
        }, ptBR);
    }

    mudaTema(tema: string): void{
        this.setState({
            tema
        })
    }
    
    render(): JSX.Element {
        this.atualizaTema();
        return (
            <ThemeProvider theme={this.tema}>
                {/* <ErrorBoundary> */}
                    <BrowserRouter>
                        <Switch>
                            <Route 
                                path="/" 
                                // component={() => <Dashboard 
                                //     tema={this.state.tema}
                                //     mudaTema={this.mudaTema.bind(this)}
                                //     />} 
                                render={(props) => (
                                    <Dashboard  
                                        {...props}
                                        tema={this.state.tema}
                                        mudaTema={this.mudaTema.bind(this)}
                                        />
                                    )}
                                />
                            
                            {/* <Route exact path="/recuperar-senha">
                                <RecuperarSenha {...this.props} />
                            </Route> */}

                            {/* <Route exact path="/carregando">
                                <Carregando {...this.props} />
                            </Route> */}

                            <Route component={Erro} />
                        </Switch>
                    </BrowserRouter>
                {/* </ErrorBoundary> */}
            </ThemeProvider>
        );
    }
}
  
export default Router;
