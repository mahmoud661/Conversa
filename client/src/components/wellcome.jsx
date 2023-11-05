import conversa from  "../media/ConversaGIF.gif"

export default function Wellcome(){

    return(<div>

        <img width={256} height={256} src={conversa} alt="conversaGIF"/>
        <h1>Wellcome to Conversa</h1>
        <h2>select a chat to start</h2>
        <h5>You can add friend from the menu</h5>
    </div>)
}