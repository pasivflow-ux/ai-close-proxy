const JOURNEY_STAGES = [
    {
        name: "Stage 1 — Spark Awareness",
        focus: "Illuminate the purpose and the stand you take so strangers understand why your brand exists.",
        postTypes: ["Founder origin story", "Purpose-driven manifesto carousel", "Behind-the-scenes mission reel"],
        engagementPrompt: "Drop a 🔥 if you're craving a more purpose-led way to {outcome}!",
        defaultCTA: "Save this to remember why you started."
    },
    {
        name: "Stage 2 — Build Curiosity",
        focus: "Show how you understand their world and the emotional tension they're navigating.",
        postTypes: ["Relatable meme", "Story-based confession", "Day-in-the-life vlog"],
        engagementPrompt: "Tell me your biggest frustration with {topic} in the comments.",
        defaultCTA: "Comment your ‘same!’ moment."
    },
    {
        name: "Stage 3 — Deepen Alignment",
        focus: "Teach the frameworks, models, and aha moments that move them from interested to invested.",
        postTypes: ["Framework carousel", "Mini-training live", "Case study breakdown"],
        engagementPrompt: "Which step of this framework are you implementing next?",
        defaultCTA: "Share with a friend who needs this reframe."
    },
    {
        name: "Stage 4 — Confident Conversion",
        focus: "Paint the picture of transformation and invite them into the container with conviction.",
        postTypes: ["Offer spotlight", "Before-and-after transformation", "Testimonial reel"],
        engagementPrompt: "DM me the word ‘Ready’ and let's map your {result} plan.",
        defaultCTA: "DM me ‘Ready’ for the next step."
    },
    {
        name: "Stage 5 — Radiant Retention",
        focus: "Celebrate clients, share community wins, and set the stage for repeat magic.",
        postTypes: ["Client celebration post", "UGC highlight", "Gratitude letter"],
        engagementPrompt: "Tag a teammate who needs this energy.",
        defaultCTA: "Tag someone who deserves their flowers."
    }
];

const VOICE_FILTERS = {
    Storyteller: {
        description: "Vulnerable, emotional, magnetic",
        opener: "Let's get heart-to-heart for a sec...",
        flair: "You feel this in your soul, right?"
    },
    Teacher: {
        description: "Educational, insightful, grounded",
        opener: "Class is in session, brilliance.",
        flair: "Take notes — wisdom incoming."
    },
    "Truth Teller": {
        description: "Bold, sassy, and scroll-stopping",
        opener: "Here's the tea nobody else is spilling...",
        flair: "No fluff, just facts that slap."
    },
    Mentor: {
        description: "Empowering, warm, guiding",
        opener: "Come sit next to me, let's map this out.",
        flair: "You've so got this and you know it."
    },
    Closer: {
        description: "Persuasive, confident, direct",
        opener: "If you're done guessing, lean in.",
        flair: "This is your nudge to bet on yourself."
    }
};

const HASHTAG_SETS = {
    reach: ["#purposeledbusiness", "#socialselling", "#onlinebusiness", "#digitalcreator", "#womeninbusiness"],
    authority: ["#brandstrategy", "#thoughtleadership", "#cashoutcopy", "#transformationcoach", "#impactdriven"],
    community: ["#divatakesaction", "#alignedambition", "#soulfulselling", "#clientlove", "#betonpurpose"]
};

function toTitleCase(value = "") {
    return value
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function buildContentPillars(businessType, offer, audience) {
    const specialty = toTitleCase(businessType || "brand");
    const transformedAudience = audience || "your audience";
    const promise = offer || "your transformation";
    return [
        {
            name: "Purpose & Point of View",
            description: `Declare the stand this ${specialty} takes for ${transformedAudience} and the bigger mission behind ${promise}.`
        },
        {
            name: "Process & Frameworks",
            description: `Demystify how your signature approach turns chaos into the promised ${promise} transformation.`
        },
        {
            name: "Proof & Receipts",
            description: `Spotlight wins, case studies, and lived experiences that show ${transformedAudience} what is possible with you.`
        },
        {
            name: "Personality & Lifestyle",
            description: `Show the human behind the brand — the rituals, routines, and sass that make this ${specialty} irresistible.`
        }
    ];
}

function formatPillarsMarkdown(pillars) {
    return pillars
        .map(pillar => `- **${pillar.name}** — ${pillar.description}`)
        .join("\n");
}

function buildIdentitySection({ businessType, offer, audience, brandTone }) {
    const safeBusinessType = businessType || "brand";
    const safeOffer = offer || "your signature transformation";
    const safeAudience = audience || "purpose-led humans";
    const safeTone = brandTone || "bold and elegant";
    const pillars = buildContentPillars(safeBusinessType, safeOffer, safeAudience);
    const positioning = `I help ${safeAudience} experience ${safeOffer} through purpose-led ${safeBusinessType}.`;
    const promise = `When they plug into this world they feel seen, supported, and ready to claim ${safeOffer.toLowerCase()}.`;
    const persona = `Think Chloe's witty, purpose-led diva energy filtered through a ${safeTone.toLowerCase()} vibe — bold conviction with graceful edges.`;

    return {
        markdown: [
            "## 1. Social Selling Identity Builder",
            "### Core Brand Positioning Statement",
            positioning,
            "",
            "### Emotional Value Promise",
            promise,
            "",
            "### Signature Content Pillars",
            formatPillarsMarkdown(pillars),
            "",
            "### Purpose Persona Summary",
            persona
        ].join("\n"),
        pillars
    };
}

function formatStageContent(stage, offer, audience, voiceFilter) {
    const details = VOICE_FILTERS[voiceFilter] || {};
    const safeOffer = offer || "your offer";
    const safeAudience = audience || "your people";
    const samplePost = `**Sample Post Idea:** ${stage.postTypes[0]} that ties ${safeAudience}'s daily struggle to your ${safeOffer} promise.`;
    const caption = [
        details.opener || "Hey purpose fam, let's talk...",
        `You know that moment when ${safeAudience} feel like they're hustling without the healing?`,
        `Inside ${safeOffer} we flip that by giving them a roadmap they can trust.`,
        details.flair || "Consider this your glitter-wrapped wake up call.",
        `CTA: ${stage.defaultCTA}`
    ].join(" ");

    return [
        `### ${stage.name}`,
        `**Stage Focus:** ${stage.focus}`,
        `**Recommended Post Types:** ${stage.postTypes.join(", ")}`,
        samplePost,
        `**Caption Prompt:** ${caption}`,
        `**Engagement Prompt:** ${stage.engagementPrompt.replace("{topic}", safeOffer).replace("{outcome}", safeOffer).replace("{result}", safeOffer)}`,
        `**CTA Suggestion:** ${stage.defaultCTA}`
    ].join("\n");
}

function buildAudienceMapSection(offer, audience, voiceFilter) {
    const stageMarkdown = JOURNEY_STAGES
        .map(stage => formatStageContent(stage, offer, audience, voiceFilter))
        .join("\n\n");

    return [
        "## 2. Audience Nurture Map",
        "### 5-Stage Journey Overview",
        JOURNEY_STAGES.map(stage => `- **${stage.name}** — ${stage.focus}`).join("\n"),
        "",
        "### Stage-by-Stage Playbook",
        stageMarkdown
    ].join("\n");
}

function buildCashFrameworkSection({ offer, audience, voiceFilter }) {
    const filterDetails = VOICE_FILTERS[voiceFilter] || {};
    const safeOffer = offer || "your offer";
    const safeAudience = audience || "your people";
    const baseHook = filterDetails.opener || "Hey visionary, pause your scroll for this truth bomb...";

    const caption = [
        "**C — Connection:**",
        `${baseHook} ${safeAudience} keep telling me they're exhausted from piecing together a path to ${safeOffer.toLowerCase()}.`,
        "**A — Alignment:**",
        "I see you craving a plan that feels both strategic and soul-honoring — the exact alchemy this offer was built for.",
        "**S — Solution:**",
        "Inside, you'll get the playbooks, prompts, and coaching to turn every post into a profitable, purpose-led asset.",
        "**H — Hook to Action:**",
        `${filterDetails.flair || "Consider this your loving nudge."} DM me the word *Glow* and let's map your next win.`
    ].join("\n");

    const reelConcept = `Reel: Split-screen showing the "force" version of selling vs. the "flow" version powered by ${safeOffer}. Overlay text with each C.A.S.H. step.`;

    const hashtags = [
        `- **Reach:** ${HASHTAG_SETS.reach.join(" ")}`,
        `- **Authority:** ${HASHTAG_SETS.authority.join(" ")}`,
        `- **Community:** ${HASHTAG_SETS.community.join(" ")}`
    ].join("\n");

    return [
        "## 3. C.A.S.H. Out Copy Framework Generator",
        "### Plug-and-Play Caption",
        caption,
        "",
        "### Recommended Reel / Carousel Concept",
        reelConcept,
        "",
        "### Hashtag Strategy",
        hashtags
    ].join("\n");
}

function buildDmScripts({ offer, audience, voiceFilter }) {
    const filterDetails = VOICE_FILTERS[voiceFilter] || {};
    const safeOffer = offer || "your offer";
    const safeAudience = audience || "your people";
    const signatureSignOff = "✨ Chloe-approved, purpose-paid.";

    const flows = [
        {
            title: "Welcome & Nurture",
            lines: [
                `Hey love! ${filterDetails.opener || "So glad you slid into this space."}`,
                `Caught your energy around ${safeOffer} and had to say hi. What's lighting you up in your ${safeAudience} world right now?`,
                "No pitch, just vibes — let's celebrate your next win together."
            ]
        },
        {
            title: "Soft Inquiry",
            lines: [
                `You've been on my mind since that last comment about ${safeOffer.toLowerCase()}.`,
                `Want me to send over the mini-audit I use to spot gaps for ${safeAudience}?`,
                "Zero pressure — just a gift from one purpose-led diva to another."
            ]
        },
        {
            title: "Offer Transition",
            lines: [
                `${filterDetails.flair || "Here's the glow-up tea."} Based on what you shared, ${safeOffer} is the exact container for your next chapter.`,
                "Want a sneak peek of how we'd map your first 30 days?",
                "If it's a yes, DM me ‘Ready’ and I'll roll out the red carpet."
            ]
        },
        {
            title: "Re-engagement",
            lines: [
                "Popped back into your DMs because your vision deserves momentum, not dust.",
                `What shifted since we last chatted about ${safeOffer}?`,
                "When you're ready, I've got a fresh idea waiting for you."
            ]
        }
    ];

    const flowMarkdown = flows
        .map(flow => `### ${flow.title}\n${flow.lines.map(line => `- ${line}`).join("\n")}\n- **Sign-off:** ${signatureSignOff}`)
        .join("\n\n");

    return [
        "## 4. DM Flow Scripts (The Diva Way)",
        flowMarkdown
    ].join("\n");
}

function rotate(array, index) {
    return array[index % array.length];
}

function buildCalendarEntries(pillars, offer, audience) {
    const formats = ["Reel", "Carousel", "Static Post", "Story Series", "Live Stream"];
    const ctAs = [
        "DM me ‘Glow’ for the blueprint.",
        "Comment your biggest aha.",
        "Share this with your accountability partner.",
        "Save this for your next content planning sesh.",
        "Drop an emoji that matches your vibe today."
    ];
    const safeAudience = audience || "your audience";

    return Array.from({ length: 30 }).map((_, index) => {
        const day = index + 1;
        const pillar = rotate(pillars, index);
        const stage = rotate(JOURNEY_STAGES, index);
        const format = rotate(formats, index);
        const cta = rotate(ctAs, index);
        const stageName = stage.name.split(" — ")[1] || stage.name;
        const storyPrompt = `Share a ${pillar.name.toLowerCase()} angle that helps ${safeAudience} move through ${stageName.toLowerCase()}.`;

        return {
            day,
            pillar: pillar.name,
            stage: stage.name,
            format,
            theme: pillar.description,
            idea: storyPrompt,
            cta
        };
    });
}

function buildCalendarSection(pillars, offer, audience) {
    const entries = buildCalendarEntries(pillars, offer, audience);
    const tableHeader = "| Day | Content Pillar | Journey Stage | Format | Theme & Prompt | CTA |";
    const tableDivider = "| --- | -------------- | ------------- | ------ | -------------- | --- |";
    const tableRows = entries
        .map(entry => `| ${entry.day} | ${entry.pillar} | ${entry.stage} | ${entry.format} | ${entry.idea} | ${entry.cta} |`)
        .join("\n");

    return [
        "## 5. Content Calendar Generator",
        "### 30-Day Flow",
        tableHeader,
        tableDivider,
        tableRows
    ].join("\n");
}

function buildVoiceFilterSection(sampleMessage) {
    const variants = Object.entries(VOICE_FILTERS)
        .map(([name, details]) => {
            const rephrased = `${details.opener} ${sampleMessage} ${details.flair}`;
            return `- **${name} (${details.description})** — ${rephrased}`;
        })
        .join("\n");

    return [
        "## 6. Social Selling Voice Filters",
        "Apply any of these presets to remix a caption, email, or DM without losing the core message:",
        variants
    ].join("\n");
}

function buildDeliverable(payload) {
    const { businessType, offer, audience, brandTone = "Confident & magnetic", voiceFilter = "Truth Teller" } = payload;

    const identity = buildIdentitySection({ businessType, offer, audience, brandTone });
    const nurtureMap = buildAudienceMapSection(offer, audience, voiceFilter);
    const cashFramework = buildCashFrameworkSection({ offer, audience, voiceFilter });
    const dmScripts = buildDmScripts({ offer, audience, voiceFilter });
    const calendar = buildCalendarSection(identity.pillars, offer, audience);
    const voiceFiltersSection = buildVoiceFilterSection(`Inside ${offer || "this offer"} you finally have a purposeful plan to sell without the ick.`);

    return [
        "# C.A.S.H. Out Copy Add-On™ — Social Selling Suite",
        `**Brand Tone:** ${brandTone} | **Voice Filter:** ${voiceFilter} (${VOICE_FILTERS[voiceFilter]?.description || "Signature Diva Default"})`,
        "",
        identity.markdown,
        "",
        nurtureMap,
        "",
        cashFramework,
        "",
        dmScripts,
        "",
        calendar,
        "",
        voiceFiltersSection,
        "",
        "---",
        "Generated with Chloe's witty, purpose-led diva energy so you can sell in flow, not force."
    ].join("\n");
}

exports.handler = async function(event) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: ""
        };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body || "{}");
        const requiredFields = ["businessType", "offer", "audience", "brandTone", "voiceFilter"];
        const missing = requiredFields.filter(field => !payload[field]);

        if (missing.length) {
            return {
                statusCode: 400,
                body: `Bad Request: Missing fields — ${missing.join(", ")}`
            };
        }

        const deliverable = buildDeliverable(payload);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ deliverable })
        };
    } catch (error) {
        return { statusCode: 500, body: `Server Error: ${error.message}` };
    }
};
