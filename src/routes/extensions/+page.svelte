<style lang="scss">
    .page {
        width: 100vw;
        height: 100vh;
        overflow: auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;

        padding-bottom: 64px;


        > .container {
            width: 100%;
            max-width: 1024px;
            margin: 8px;

            > .title-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                margin-top: 32px;
                margin-bottom: 64px;
                color: rgb(var(--color2-rgb));

                .title {
                    font-size: 38px;
                    font-weight: 600;
                }

                .description {
                    font-size: 16px;
                    font-weight: 200;
                    opacity: 0.75;
                }
            }

            > .content {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 8px;
                width: 100%;

                .item {
                    width: calc(50% - 8px);
                    color: rgb(var(--color2-rgb));
                    border-radius: 8px;
                    contain: content;
                    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), var(--bg);
                    background-size: contain;
                    background-position: right center;
                    background-repeat: no-repeat;
                    display: flex;
                    flex-direction: column;
                    
                    > .top {
                        .title-container {
                            display: flex;
                            flex-direction: column;
                            padding: 8px;
                            background-color: rgba(0, 0, 0, 0.25);

                            .top {
                                display: flex;
                                align-items: flex-end;

                                .title {
                                    opacity: 0.95;
                                }

                                .version {
                                    opacity: 0.5;
                                    font-size: 12px;
                                    font-weight: 200;
                                    margin-left: 4px;
                                }
                            }

                            .bottom {
                                font-size: 12px;
                                font-weight: 200;
                                opacity: 0.5;
                            }
                        }

                        .description {
                            padding: 8px;
                            font-size: 14px;
                            opacity: 0.9;
                            height: 50px;
                            text-shadow: 1px 1px 4px rgb(var(--color1-rgb));
                        }
                    }

                    > .bottom {
                        display: flex;
                        align-items: flex-end;
                        justify-content: flex-end;
                        height: 100%;
                        padding: 8px;
                        gap: 8px;

                        .button {
                            padding: 8px;
                            text-decoration: none;
                            color: rgb(var(--color2-rgb));
                            border-radius: 8px;
                            background-color: rgba(0, 0, 0, 0.25);
                            cursor: pointer;

                            &:hover {
                                background-color: rgba(0, 0, 0, 0.35);
                            }

                            &.disabled {
                                opacity: 0.75;
                                pointer-events: none;
                            }
                        }
                    }
                }

                @media screen and (max-width: 700px) {
                    .item {
                        width: calc(100% - 8px);
                    }
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

        &--install {
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
            }
        }
    }
</style>

<script>
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
	import { findPort } from '$lib/utils.js';
	import { onMount } from 'svelte';
    
    let type = $page.url.searchParams.get("type") == "themes" ? "themes" : "plugins";

    /** @type {import('./$types').PageData} */
    export let data;

    let lastInstalledURL = "";

    let socketPort;
    let ws;

    function installExtension(url) {
        if (!ws) return;

        lastInstalledURL = url;

        ws.send(JSON.stringify(
            [
                crypto.randomUUID(),
                "InstallExtension",
                { url }
            ]
        ));
    }

    onMount(async ()=>{
        if (!browser) return;
        socketPort = await findPort(6463, 20);

        if (socketPort) {
            ws = new WebSocket(`ws://127.0.0.1:${socketPort}/acord`);
        }
    });
</script>

<svelte:head>
    <title>Acord - Extensions</title>
    <meta property="og:site_name" content="Acord" />
    <meta property="og:title" content="Acord - Extensions" />
    <meta property="og:description" content="Fix Discord’s sloppy jobs and breathe new life to the client." />
    <meta property="og:image" content="https://acord.app/favicon.png" />
    <meta property="theme-color" content="#fafafa" />
</svelte:head>

<div class="page">

    <div class="container">
        <div class="title-container">
            <h1 class="title">Acord Extensions</h1>
            <p class="description">
                Explorer any kind of official Acord {type} here!
            </p>
        </div>
        <div class="content">
            {#each data.extensions as item}
                <div class="item" style:--bg="url('{item.manifest.about.preview}')">
                    <div class="top">
                        <div class="title-container">
                            <div class="top">
                                <h3 class="title">{item.manifest.about.name}</h3>
                                <span class="version">v{item.manifest.about.version}</span>
                            </div>
                            <div class="bottom">
                                <div class="authors">
                                    made by {item.manifest.about.authors.join(", ")}
                                </div>
                            </div>
                        </div>
                        <div class="description">
                            {item.manifest.about.description}
                        </div>
                    </div>
                    <div class="bottom">
                        <a class="button button--github" href="https://github.com/AcordPlugin/plugins/tree/main/users/{item.user}/{item.slug}">
                            Github
                        </a>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="button button--install" class:disabled="{!socketPort}" on:click={()=>installExtension(item.url)}>
                            Install
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<div class="modal modal--install" class:visible="{lastInstalledURL}">
    <div class="top">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="close" on:click={()=>lastInstalledURL = ''}></div>
    </div>
    <div class="bottom">
        <h2 class="title">Look to APP!</h2>
        <p class="description">
            To continue installation please look to desktop app!
        </p>
    </div>
</div>



