import { ArrowUpRight } from "@/components/icons";
import { RevealLines } from "@/components/home/reveal-lines";

const calendlyUrl = "https://calendly.com/arin-cevrynt/cevrynt-demo";

export function WalkthroughBand() {
  return (
    <section className="walkthrough-band section-shell">
      <div>
        <p className="section-kicker">Founder-led walkthrough</p>
        <RevealLines as="h2" text="See how Cevrynt fits your underwriting process." />
      </div>
      <div className="walkthrough-right">
        <p>Bring a representative workflow and the review questions your team needs answered.</p>
        <a className="primary-cta" href={calendlyUrl} target="_blank" rel="noreferrer">
          Book a walkthrough
          <span aria-hidden="true"><ArrowUpRight /></span>
        </a>
        <p className="walkthrough-note">30-minute session · No sales pitch</p>
      </div>
    </section>
  );
}
