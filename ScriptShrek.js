async function enviarScript(scriptText){
    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line),
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)

	if(!textarea) throw new Error("Não há uma conversa aberta")

	for(const line of lines){
		console.log(line)

		textarea.textContent = line
		textarea.dispatchEvent(new InputEvent("input", { bubbles: true }));

		(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click()
		
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250))
	}

	return lines.length
}

enviarScript(`
SHREK

Written by

William Steig & Ted Elliott

SHREK
Once upon a time there was a lovely 
princess. But she had an enchantment 
upon her of a fearful sort which could 
only be broken by love's first kiss. 
She was locked away in a castle guarded 
by a terrible fire-breathing dragon. 
Many brave knights had attempted to 
free her from this dreadful prison, 
but non prevailed. She waited in the 
dragon's keep in the highest room of 


`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)