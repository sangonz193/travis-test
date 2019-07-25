import styled, { css } from "styled-components";
import { Breakpoint, Mixins } from "../../../../style";
import { CourseItem } from "../courseitem/CourseItem";

export const styles = {
	Wrapper: styled.div`
		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				padding: 20px 0;
				${Mixins.VSpacing(20)};
			`
		)};
	`,

	CourseItem: styled(CourseItem)``,
};
