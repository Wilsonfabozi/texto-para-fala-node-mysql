import React from "react";
import { Button, MenuItem, TextField, CircularProgress, IconButton, 
    Typography, Toolbar, AppBar, Snackbar, Fade, FadeProps } from "@material-ui/core";
import { RecordVoiceOver, Brightness2, Brightness7 } from "@material-ui/icons";
import axios from "axios";
import classnames from "classnames";

type DashState = {
    buscando: boolean;
    enviando: boolean;
    mensagens: Array<Record<string, any>>;
    idiomas: Array<{
        nome: string,
        descricao: string
    }>,
    vozes: Array<{
        nome: string,
        descricao: string
    }>,
    volume: number,
    txtMensagem: string;
    txtIdioma: string;
    txtIdiomaErro: boolean;
    txtVoz: string;
    txtVozErro: boolean;
    alerta: boolean;
    txtAlerta: string;
    transicao: (fade: FadeProps) => JSX.Element;
    // anchorEl: any;
}

type DashProps = {
    tema: string;
    mudaTema: (tema: string) => void;
}

class Dashboard extends React.Component<DashProps, DashState> {
    montado = false;

    constructor(props: DashProps){
        super(props);

        this.state = {
            buscando: false,
            enviando: false,
            mensagens: [],
            idiomas: [],
            vozes: [],
            volume: 1,
            txtMensagem: "",
            txtIdioma: "",
            txtIdiomaErro: false,
            txtVoz: "",
            txtVozErro: false,
            alerta: false,
            txtAlerta: "",
            transicao: Fade
            // anchorEl: null
        }
    }

    componentDidMount(): void {
        document.title = 'Conversor de Texto para Fala';
        this.montado = true;
        this.buscaIdiomas();
    }

    handleIncluir(): void {
        this.setState({
            enviando: true
        })
        axios
        .post("http://localhost:3001/mensagem/incluir", {
            mensagem: this.state.txtMensagem
        })
        .then(() => {
            this.setState({
                enviando: false,
                txtMensagem: ""
            })
            this.buscaMensagens();
        })
        .catch(erro => {
            this.setState({
                enviando: false,
                txtAlerta: `Erro ao adicionar mensagem: ${erro.response.data}`,
                alerta: true
            })
        })
    }

    // eslint-disable-next-line class-methods-use-this
    handleTocar(mensagem: string): void {
        let cont = 0;

        if(this.state.txtIdioma === "" || this.state.txtVoz === ""){
            cont += 1;
            if(this.state.txtIdioma === ""){
                this.setState({
                    txtIdiomaErro: true
                })
            }
            if(this.state.txtVoz === ""){
                this.setState({
                    txtVozErro: true
                })
            }
        }

        if(cont === 0){
            this.setState({
                buscando: true
            })
            const audio = new Audio(`http://localhost:3001/mensagem/tts?mensagem=${mensagem}&voz=${this.state.txtVoz}`);
            audio.volume = this.state.volume;
            audio.addEventListener("ended", () => {
                this.setState({
                    buscando: false
                })
            });
            audio.play()
            .catch((erro) => {
                this.setState({
                    buscando: false,
                    txtAlerta: `Erro ao reproduzir áudio: ${  erro}`,
                    alerta: true
                })
            })
        }
    }

    fechaAlerta(): void {
        this.setState({
            alerta: false
        })
    }

    // handleMaisOpcoes(event: any): void {
    //     this.setState({
    //         anchorEl: event.currentTarget
    //     })
    // }

    // handleFecharOpcoes(): void {
    //     this.setState({
    //         anchorEl: null
    //     })
    // }

    buscaIdiomas(): void {
        this.setState({
            buscando: true
        })
        axios
        .post(`http://localhost:3001/idioma/listar`)
        .then(response => {
            if(this.montado){
                this.setState({
                    buscando: false,
                    idiomas: response.data.idiomas,
                    vozes: response.data.vozes,
                    txtIdioma: "pt-BR",
                    txtVoz: "pt-BR_IsabelaVoice"
                })
            }
            this.buscaMensagens();
        }).catch(erro => {
            this.setState({
                buscando: false,
                txtAlerta: `Erro ao buscar idiomas: ${  erro.response.data}`,
                alerta: true
            })
        })
    }

    buscaMensagens(): void {
        this.setState({
            buscando: true
        })
        axios
        .post(`http://localhost:3001/mensagem/listar`)
        .then(response => {
            if(this.montado){
                this.setState({
                    buscando: false,
                    mensagens: response.data.mensagens
                })
            }
        }).catch(erro => {
            this.setState({
                buscando: false,
                txtAlerta: `Erro ao buscar mensagens: ${erro.response.data}`,
                alerta: true
            })
        })
    }

    render(): JSX.Element {
        // const open = Boolean(this.state.anchorEl);
        return (
            <div style={{ height: "100%" }}>
                <AppBar position="static">
                    <Toolbar>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            color: this.props.tema === "tema-claro" ? "black" : "cornflowerblue",
                            transition: "color 500ms ease-in-out 0s"
                        }}>
                            <IconButton color="inherit" >
                                <RecordVoiceOver style={{ color: "yellow !important"}} />
                            </IconButton>
                            <Typography 
                                variant="h6" 
                                style={{ 
                                    paddingLeft: 10,
                                    color: this.props.tema === "tema-claro" ? "black" : "white",
                                    transition: "color 500ms ease-in-out 0s"
                                }}>
                                Conversor de Texto para Fala
                            </Typography>
                        </div>
                        <IconButton 
                            color="inherit" 
                            onClick={() => {
                                this.props.mudaTema(this.props.tema === "tema-claro" ? "tema-escuro" : "tema-claro")
                            }}>
                            {this.props.tema === "tema-claro" ? 
                                <Brightness7 color="inherit" />
                            :
                                <Brightness2 color="inherit" />
                            }
                            
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={`box-dashboard box-dashboard-${this.props.tema}`}>
                    <div 
                        className="box-comentario" 
                        style={{ borderRight: this.props.tema === "tema-claro" ? "1px solid #c8c8c8" : "1px solid cornflowerblue" }}>
                        <div className="box-titulo-comentario">
                            <span style={{
                                fontWeight: "bold",
                                fontSize: 26,
                                color: this.props.tema === "tema-claro" ? "black" : "white",
                                transition: "color 500ms ease-in-out 0s"
                            }}>
                                Comentário
                            </span>
                            {this.state.enviando ? 
                                <CircularProgress 
                                    style={{
                                        marginLeft: 20
                                    }}
                                    size={24}
                                    />
                            : null}
                        </div>
                        <span style={{
                            paddingTop: 4,
                            paddingBottom: 20,
                            color: this.props.tema === "tema-claro" ? "black" : "white",
                            transition: "color 500ms ease-in-out 0s"
                        }}>
                            Adicione uma mensagem personalizada
                        </span>
                        <TextField
                            label="Mensagem"
                            value={this.state.txtMensagem}
                            onChange={(event) => {
                                if(event.target.value.length <= 255){
                                    this.setState({
                                        txtMensagem: event.target.value
                                    })
                                }
                            }}
                            multiline
                            rows={6}
                            variant="outlined"
                            />
                        <Button 
                            classes={{
                                label: this.state.buscando || this.state.enviando ? "botao-desativado" : ""
                            }}
                            className={classnames("botao", {
                                "botao-claro": this.props.tema === "tema-claro" && !this.state.enviando,
                                "botao-escuro": this.props.tema === "tema-escuro" && !this.state.enviando,
                            })} 
                            disabled={this.state.buscando}
                            onClick={() => this.handleIncluir()}
                            variant="contained">
                            Cadastrar
                        </Button>
                        <div className="box-idiomas">
                            <TextField
                                select
                                label="Idioma"
                                value={this.state.txtIdioma}
                                onChange={(event) => {
                                    this.setState({
                                        txtIdioma: event.target.value,
                                        txtIdiomaErro: false,
                                        txtVoz: ""
                                    })
                                }}
                                error={this.state.txtIdiomaErro}
                                variant="outlined">
                                {this.state.idiomas.map((option, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <MenuItem key={`idioma_${index}`} value={option.nome}>
                                        {option.descricao}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label="Voz"
                                value={this.state.txtVoz}
                                onChange={(event) => {
                                    this.setState({
                                        txtVoz: event.target.value,
                                        txtVozErro: false
                                    })
                                }}
                                error={this.state.txtVozErro}
                                variant="outlined">
                                {this.state.vozes.filter(item => {
                                    return String(item.nome).includes(this.state.txtIdioma)
                                }).map((option, index) => {
                                    return (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <MenuItem key={`voz_${index}`} value={option.nome}>
                                        {option.descricao}
                                    </MenuItem>
                                )})}
                            </TextField>
                        </div>
                    </div>
                    <div 
                        className="box-mensagens"
                        style={{ borderLeft: this.props.tema === "tema-claro" ? "1px solid #c8c8c8" : "1px solid cornflowerblue" }}>
                        <div className="box-titulo-mensagens">
                            <div>
                                <span style={{
                                    fontWeight: "bold",
                                    fontSize: 26,
                                    marginBottom: 30,
                                    color: this.props.tema === "tema-claro" ? "black" : "white",
                                    transition: "color 500ms ease-in-out 0s"
                                }}>
                                    Lista de Mensagens
                                </span>
                                {this.state.buscando ? 
                                    <CircularProgress 
                                        style={{
                                            marginLeft: 20
                                        }}
                                        size={24}
                                        />
                                : null}
                            </div>
                            
                            {/* <div style={{
                                color: this.props.tema === "tema-claro" ? "black" : "white",
                                transition: "color 500ms ease-in-out 0s"
                            }}>
                                <IconButton
                                    onClick={(event) => this.handleMaisOpcoes(event)}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={() => this.handleFecharOpcoes()}
                                    PaperProps={{
                                        style: {
                                            color: this.props.tema === "tema-claro" ? "black" : "white",
                                            backgroundColor: this.props.tema === "tema-claro" ? "white" : "#28284e",
                                            transition: "background-color 500ms ease-in-out 0s, color 500ms ease-in-out 0s"
                                        },
                                    }}>
                                        <MenuItem 
                                            key="editar" 
                                            onClick={() => this.handleFecharOpcoes()}>
                                            Editar
                                        </MenuItem>
                                </Menu>
                            </div> */}
                        </div>
                    
                        {this.state.mensagens.map((item, index) => {
                            return (
                                <div 
                                    className="box-lista-mensagens"
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={`mensagem_${index}`}>
                                    <div 
                                        className="box-txt-mensagem" 
                                        style={{ color: this.props.tema === "tema-claro" ? "black" : "white" }}>
                                        {item.mensagem}
                                    </div>
                                    <div className="box-botao-mensagem">
                                        <Button 
                                            classes={{
                                                label: this.state.buscando || this.state.enviando ? "botao-desativado" : ""
                                            }}
                                            className={classnames("botao-ouvir", {
                                                "botao-ouvir-claro": this.props.tema === "tema-claro" && !this.state.enviando,
                                                "botao-ouvir-escuro": this.props.tema === "tema-escuro" && !this.state.enviando
                                            })} 
                                            disabled={this.state.buscando}
                                            onClick={() => this.handleTocar(item.mensagem)}>
                                            Ouvir
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                        <Snackbar
                            open={this.state.alerta}
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            onClose={() => this.fechaAlerta()}
                            TransitionComponent={this.state.transicao}
                            message={this.state.txtAlerta}
                            key={this.state.transicao.name}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
