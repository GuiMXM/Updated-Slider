import styles from './slider.module.css';
import React, {useRef, useState} from 'react';


//Faz uma chamada p/ API e guarda o retorno em cachedImages
//Renderizar a posição correta da imagem

function Slider() {
		
    // cached images already requested to api
    
    // current images show
    let [imgs, setImgs] = useState([]);

    const base64 = "data:image/jpeg;base64,"
    const valRef = useRef("")
    
    
    //Request to the api
    async function addImage() {
        console.log("chamando api");
        console.log(valRef.current.value)
        let val = valRef.current.value
        let apiRes = await fetch(`https://swordcraft-image-generator.herokuapp.com/create-image/${val}`, {method:"GET"});

        apiRes = await apiRes.json();
        let img = base64 + apiRes.raw_image;
        setImgs([...imgs, img])
        
        console.log('val='+val.length)
        
    }
    
   
    
    //slide images through padding
    const [padding, setpadding] = useState(0);

    function skipRight(){
        if( padding < ((imgs.length-4)*220)){
            setpadding(padding+220)
        }
        
    }  

    function skipLeft(){
        //Condicional para não bugar o padding
        if( padding >= 1){
            setpadding(padding-220)
        }
        console.log("margem:" + padding)
    } 

    function reset(){
            setpadding(0)
            
    } 
    

    // Components
    function Images() {

        return(
            <>
                {imgs.length === 0 ? (<h2>Você ainda não possui nenhuma imagem</h2>) :(imgs.map((imagem,id)=> <img key={id} src={imagem} alt="imagem aparecerá aqui"></img>))}
            </>
        )
    }
    
    return(
        <>
            
            <div className={styles.mainWrapper}>

                {imgs.length > 4 && 
                <>  
                    <div style={{display:"flex"}} >

                        <button className={styles.p} onClick={()=>skipLeft()} >Skip to the left {'<'} </button>

                        <button className={styles.p} onClick={()=>reset()} >Reset</button>
                        
                        <button className={styles.p} onClick={()=>skipRight()} >Skip to the right &gt; </button>

                    </div>
                
                </>
                }

                <div style={{paddingRight: padding+"px", transition:".4s", borderBottom: "3px solid black",borderTop: "3px solid black",}} >
                    <div className={styles.imgwrapper} > 
                        <Images/>                 
                    </div>          

                </div>

                     <input type="text" maxLength="16" className={styles.code16} ref={valRef}
                     placeholder="   Digite o código aqui"></input>

                <button onClick={addImage}>Enviar</button>

                     <p>O código deve conter 16 dígitos</p>
                     <p>O limite máximo de caracteres é 16.</p>
            </div>
            
        </>
    )
}

export default Slider