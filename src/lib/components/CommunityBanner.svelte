<script>
  import Grid from "$lib/components/Grid.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";

  import DiscordIcon from "$lib/icons/social/discord.svg?raw";
  import GitHubIcon from "$lib/icons/social/github.svg?raw";
</script>

<Grid columns={2} columnGap="10rem" rowGap="3.5rem">
  <div>
    <span>{@html DiscordIcon}</span>
    <span>Join the conversation</span>
    <p>
      Have a question or want to learn more?
      There are thousands of knowledgeable community members on the Discord.
    </p>
    <LinkButton href="https://discord.com/invite/FEzeve2NX2" target="_blank" style="secondary" fullWidth>
      Join our Discord
    </LinkButton>
  </div>
  <div>
    <span>{@html GitHubIcon}</span>
    <span>Developer Resources</span>
    <p>
      Check out the code behind the comma 3X and openpilot.
      Review, fork, and contribute to the open source ecosystem.
    </p>
    <LinkButton href="https://github.com/commaai/openpilot" target="_blank" style="secondary" fullWidth>
      Visit our GitHub
    </LinkButton>
  </div>
</Grid>

<style>
  span {
    display: block;
    color: white;
    font-size: 2rem;
  }

  p {
    color: white;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
</style>
