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
            color: white;
            height: 60%;
            padding-top: 64px;

            img {
                height: 180px;
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
                color: white;
                font-size: 12px;
                opacity: 0.5;
            }

            .download {
                margin-top: 4px;
                padding: 12px 48px;
                background-color: white;
                color: black;
                font-weight: 900;
                border-radius: 8px;
                font-size: 24px;
                cursor: pointer;
                text-decoration: none;
            }

            .im-not-convinced {
                margin-top: 8px;
                font-weight: 200;
                color: white;
                font-size: 12px;
                cursor: pointer;
                text-decoration: underline;
            }
        }

        .bottom {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            height: 50%;

            .preview {
                position: absolute;
                top: 100%;
                transform: translate(0%, -50%);
                bottom: 0;
                width: 90vw;
                max-width: 1024px;
                border-radius: 45px;
                border: 4px solid white;
            }
        }
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        color: black;
        box-shadow: 0px 4px 16px black;
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
                    background-color: white;
                    color: black;
                    border: 4px solid black;
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
    <title>Acord</title>
</svelte:head>

<div class="page">
    <div class="top">
        <img src="https://acord.app/api/logo.svg?fg=ffffff" alt="logo">
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