import React from "react";
import Link from "next/link";
import {Button} from "react-bootstrap";
import BaseLayout from "../components/BaseLayout";

const auth = () => (
    <BaseLayout>
        <Link href="/auth/google">
            <Button
                bsStyle="primary"
            >
                Connect with google
            </Button>
        </Link>
        <Link href="/auth/facebook">
            <Button
                bsStyle="primary"
            >
                Connect with facebook
            </Button>
        </Link>
    </BaseLayout>
);

export default auth;
