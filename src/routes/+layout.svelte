<style lang="scss">
    #nav {
        width: 100vw;
        height: 50px;
        background-color: rgba(var(--color1-rgb), 0.5);
        backdrop-filter: blur(2px);
        position: absolute;
        top: 0px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;

        z-index: 999;

        .left, .right {
            display: flex;
            align-items: center;
            gap: 16px;

            svg {
                color: rgb(var(--color2-rgb));
                width: 28px;
            }
        }

        p {
            font-size: 18px;
            color: rgb(var(--color2-rgb));
        }

        .small {
            font-size: 14px;
            opacity: 0.5;
        }

        a {
            font-size: 18px;
            color: rgb(var(--color2-rgb));
            text-decoration: none;

            &:hover, &.active {
                text-decoration: underline;
            }
        }

        @media screen and (max-width: 768px){
            .hideonmobile {
                display: none;
            }
        }
    }
</style>

<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";

    let countData = { activeCount: 1, allTimeMaxCount: 1 };

    onMount(()=>{
        async function update() {
            let d = (await (await fetch(`https://api.acord.app/users`)).json());
            countData = d.data;
        }
        let interval = setInterval(update, 10000);
        update();

        return ()=>{
            clearInterval(interval);
        }
    })
</script>

<div id="svelte-layout">
    <div id="nav">
        <div class="left">
            <a href="/" class:active="{$page.url.href.endsWith("/")}" data-sveltekit-prefetch>Home</a>
            <a href="/extensions?type=plugins" class:active="{$page.url.href.endsWith("/extensions?type=plugins")}" data-sveltekit-prefetch>Plugins</a>
            <a href="/extensions?type=themes" class:active="{$page.url.href.endsWith("/extensions?type=themes")}" data-sveltekit-prefetch>Themes</a>
        </div>
        <div class="right">
            <p class="small hideonmobile">{countData.activeCount} active user, {countData.allTimeMaxCount} all-time max. </p>
            <a href="https://discord.gg/acord">
                <svg viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="71" height="55" fill="currentColor" />
                        </clipPath>
                    </defs>
                </svg>
            </a>
            <a href="https://github.com/AcordPlugin">
                <svg viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5781 50.4995C14.3985 50.5003 14.2193 50.4814 14.0437 50.4433C22.1448 52.6012 26.4159 52.0081 33.9562 50.4433C33.7712 50.4815 33.5827 50.5003 33.3937 50.4995C32.2266 50.4995 31.7906 49.6417 31.7906 48.8823C31.7906 47.8276 31.8328 44.3401 31.8328 40.0229C31.8328 37.0136 30.8203 35.0448 29.6953 34.0464C36.7125 33.2448 44.0812 30.5167 44.0812 18.1136C44.0812 14.5979 42.8578 11.7151 40.8469 9.45107C41.1703 8.63545 42.2531 5.34482 40.5375 0.901074C40.3074 0.846008 40.0709 0.822356 39.8344 0.830762C38.6953 0.830762 36.1219 1.2667 31.875 4.21982C26.7147 2.77604 21.2572 2.77604 16.0969 4.21982C11.85 1.2667 9.27656 0.830762 8.1375 0.830762C7.90103 0.822356 7.6645 0.846008 7.43437 0.901074C5.71875 5.34482 6.80156 8.63545 7.125 9.45107C5.11406 11.7011 3.89062 14.5839 3.89062 18.1136C3.89062 30.4886 11.2453 33.2589 18.2344 34.0745C17.3344 34.8901 16.5188 36.3104 16.2375 38.3917C15.1102 38.923 13.8835 39.2105 12.6375 39.2354C10.7531 39.2354 8.64375 38.462 7.06875 35.7058C7.06875 35.7058 5.40938 32.6401 2.24531 32.3589H2.23125C2.02031 32.3589 -0.707812 32.4151 2.03438 34.3417C2.03438 34.3417 4.10156 35.3401 5.53594 39.0667C5.53594 39.0667 6.91406 43.7776 12.975 43.7776C14.0452 43.7696 15.1111 43.6422 16.1531 43.3979C16.1672 46.0979 16.1953 48.123 16.1953 48.8964C16.1953 49.6417 15.7453 50.4995 14.5781 50.4995Z" fill="currentColor"/>
                </svg>
            </a>
        </div>
    </div>
    <div id="content">
        <slot></slot>
    </div>
</div>