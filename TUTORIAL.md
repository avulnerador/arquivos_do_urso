# Tutorial — Site de Links do Urso

## O que já está pronto

- `index.html` — página, lê `links.json` e monta os botões sozinho
- `style.css` — visual estilo Linktree
- `links.json` — lista de links (isso aqui você vai editar sempre)

Não mexe no `index.html` nem `style.css` no dia a dia. Só no `links.json`.

---

## Passo 1 — Criar conta no GitHub (se não tiver)

github.com → criar conta.

## Passo 2 — Criar repositório

1. No GitHub, "New repository"
2. Nome, ex: `links-urso`
3. Público (precisa ser público pro Cloudflare Pages free e pros Releases funcionarem sem token)
4. Criar

## Passo 3 — Subir esses arquivos pro repositório

Instala o Git se não tiver (git-scm.com), depois no terminal, dentro dessa pasta:

```
git init
git add index.html style.css links.json
git commit -m "site inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/links-urso.git
git push -u origin main
```

(troca `SEU-USUARIO/links-urso` pelo link do seu repo)

## Passo 4 — Conectar no Cloudflare Pages

1. dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Autoriza o GitHub, escolhe o repo `links-urso`
3. Build settings: deixa tudo em branco / "None" (não tem build, é HTML puro)
   - Build command: (vazio)
   - Output directory: `/`
4. Save and Deploy

Pronto, site vai ficar em algo tipo `links-urso.pages.dev`. Depois pode apontar domínio próprio nas configs do Pages.

## Passo 5 — Subir um arquivo pra download (ex: datapack)

Não sobe o arquivo dentro do repo normal (trava em arquivo grande). Usa **GitHub Releases**:

1. No repo, aba **Releases** → **Create a new release**
2. Tag, ex: `v1.0`
3. Em "Attach binaries", arrasta o arquivo do datapack (.zip)
4. Publish release
5. Clica com botão direito no arquivo anexado → "copiar link" (ou só clica e copia da barra de endereço)

O link vai ser tipo:
```
https://github.com/SEU-USUARIO/links-urso/releases/download/v1.0/datapack.zip
```

## Passo 6 — Adicionar o link na página

Abre `links.json`, adiciona um bloco novo:

```json
[
  {
    "title": "Meu Datapack",
    "desc": "Datapack de Minecraft",
    "url": "https://github.com/SEU-USUARIO/links-urso/releases/download/v1.0/datapack.zip"
  },
  {
    "title": "Outra Coisa",
    "desc": "descrição aqui",
    "url": "link aqui"
  }
]
```

Cada `{ }` é um botão. Cuidado com vírgula entre eles.

## Passo 7 — Publicar a atualização

```
git add links.json
git commit -m "add novo link"
git push
```

Cloudflare Pages detecta o push e atualiza o site sozinho, sem precisar fazer nada no dashboard.

---

## Resumo do fluxo de uso (o que você vai fazer sempre que for postar algo novo)

1. Cria Release no GitHub com arquivo anexado
2. Copia link do arquivo
3. Cola no `links.json`
4. `git add`, `git commit`, `git push`
5. Espera ~30s, site atualizado

## Extras opcionais

- **Avatar**: coloca uma imagem `avatar.png` na pasta e sobe no repo, aparece automático no topo.
- **Domínio próprio**: no Cloudflare Pages → Custom domains → adiciona seu domínio (precisa estar na Cloudflare).
- **Editar sem terminal**: dá pra editar `links.json` direto pelo site do GitHub (abre arquivo → ícone de lápis → edita → commit). Não precisa nem git na máquina.
