import React from "react";

class Erro extends React.Component {
    componentDidMount(): void {
        document.title = 'Página não encontrada (Erro 404)';
    }

    render(): JSX.Element {
        return (
            <div>
                Erro 404
            </div>
        )
    }
}

export default Erro;
