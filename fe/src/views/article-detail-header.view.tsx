import { Header, If } from "../utils/garage";
import { LanguageToggleView } from "./language-toggle.view";
import { PageProps } from "../utils/page-wrapper";
import ReturnButtonView from './return-button.view'


export function ArticleDetailHeaderView({ routerInfo }: PageProps) {


    return (
        <div>
            <Header sticky>
                <span>PETER'S PORTFOLIO</span>
                <div slot="extra">
                    <LanguageToggleView />
                </div>
            </Header>

            <Header sticky >
                <ReturnButtonView en="BACK" zh="返回" />

            </Header>
        </div >
    );
}
