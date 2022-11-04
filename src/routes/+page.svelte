<style lang="scss">
    .page {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        overflow: hidden;

        .top {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: rgb(var(--color2-rgb));
            height: 60%;
            margin-top: 10vh;

            .logo {
                height: min(25vh, 180px);
                pointer-events: none;
            }

            .title {
                margin-top: 16px;
                font-weight: 500;
            }

            .description {
                text-align: center;
                margin-top: 8px;
                font-weight: 300;
            }

            .download-count {
                margin-top: 32px;
                font-weight: 300;
                color: rgb(var(--color2-rgb));
                font-size: 12px;
                opacity: 0.75;
            }

            .download {
                margin-top: 4px;
                padding: 12px 48px;
                background-color: rgb(var(--color2-rgb));
                color: rgb(var(--color1-rgb));
                font-weight: 900;
                border-radius: 8px;
                font-size: 24px;
                cursor: pointer;
                text-decoration: none;
            }

            .im-not-convinced {
                margin-top: 8px;
                font-weight: 400;
                color: rgb(var(--color2-rgb));
                font-size: 12px;
                cursor: pointer;
                text-decoration: underline;
            }
        }

        .bottom {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            height: 200px;

            .preview {
                pointer-events: none;
                position: absolute;
                top: 100%;
                transform: translate(0%, -50%);
                bottom: 0;
                width: 90vw;
                height: 35vh;
                max-width: 1024px;
                border-radius: 45px;
                border: 4px solid rgb(var(--color2-rgb));
                box-shadow: 0px 0px 16px rgba(var(--color2-rgb), 1), inset 0px 0px 1px rgba(var(--color2-rgb), 1);
                outline-width: 2px;
                outline-style: solid;
                outline-color: rgba(var(--color2-rgb), 0.25);
                outline-offset: 8px;
                object-fit: cover;
            }

            @media screen and (min-height: 720px) {
                .preview {
                    height: 55vh;
                }
            }
            
        }
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(var(--color2-rgb));
        color: rgb(var(--color1-rgb));
        box-shadow: 0px 4px 16px rgb(var(--color1-rgb));
        width: 350px;
        max-width: 90vw;
        border-radius: 32px;
        padding: 24px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 100ms ease-in-out;

        &.visible {
            opacity: 1;
            pointer-events: all;
        }

        &--oh-ok {
            display: flex;
            flex-direction: column;

            .top {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .close {
                    background-color: red;
                    cursor: pointer;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    box-shadow: 0px 0px 4px red;
                }
            }

            .bottom {
                margin-top: 4px;
                display: flex;
                align-items: center;
                flex-direction: column;

                .title {
                    margin-top: 8px;
                    font-weight: 800;
                }

                .description {
                    text-align: center;
                    margin-top: 8px;
                    font-weight: 400;
                }

                .download {
                    margin-top: 32px;
                    padding: 6px 24px;
                    background-color: rgb(var(--color2-rgb));
                    color: rgb(var(--color1-rgb));
                    border: 4px solid rgb(var(--color1-rgb));
                    font-weight: 900;
                    border-radius: 8px;
                    font-size: 24px;
                    cursor: pointer;
                    text-decoration: none;
                }
            }
        }
    }
</style>

<script>
	import { onMount } from "svelte";


    let ohokModalVisible = false;
    let downloadCount = 2;

    onMount(async ()=>{
        let fetched = await fetch("https://api.github.com/repos/AcordPlugin/acord-installer-new/releases/80710913");
        let json = await fetched.json();
        downloadCount = json.assets.reduce((all, current)=> all+current.download_count, 0);
    })
</script>

<svelte:head>
    <title>Acord - The Client Mod</title>
    <meta property="og:site_name" content="Acord" />
    <meta property="og:title" content="Acord - The Client Mod" />
    <meta property="og:description" content="Fix Discord’s sloppy jobs and breathe new life to the client." />
    <meta property="og:image" content="https://acord.app/favicon.png" />
    <meta property="theme-color" content="#fafafa" />
</svelte:head>

<div class="page">
    <div class="top">
        <img class="logo" src="https://acord.app/api/logo.svg?fg=fafafa" alt="logo">
        <h1 class="title">Acord</h1>
        <p class="description">
            Fix Discord’s sloppy jobs and<br>
            breathe new life to the client.
        </p>
        <div class="download-count">
            {downloadCount - 1}+ downloads
        </div>
        <a class="download" href="https://github.com/AcordPlugin/acord-installer-new/releases/tag/v0.1.0">
            Download Acord
        </a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="im-not-convinced" on:click={()=>ohokModalVisible = !ohokModalVisible}>
            I’m not convinced
        </div>
    </div>
    <div class="bottom">
        <img class="preview" src="/app.png" alt="preview">
    </div>
</div>

<div class="modal modal--oh-ok" class:visible="{ohokModalVisible}">
    <div class="top">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="close" on:click={()=>ohokModalVisible = false}></div>
    </div>
    <div class="bottom">
        <h2 class="title">Oh Ok..</h2>
        <p class="description">
            There’s no comparison chart,<br> 
            we’re just better.
        </p>
        <a class="download" href="https://github.com/AcordPlugin/acord-installer-new/releases/tag/v0.1.0">
            download anyway
        </a>
    </div>
</div>