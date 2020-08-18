package merlion_techs.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import merlion_techs.web.rest.TestUtil;

public class PermissionsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permissions.class);
        Permissions permissions1 = new Permissions();
        permissions1.setId(1L);
        Permissions permissions2 = new Permissions();
        permissions2.setId(permissions1.getId());
        assertThat(permissions1).isEqualTo(permissions2);
        permissions2.setId(2L);
        assertThat(permissions1).isNotEqualTo(permissions2);
        permissions1.setId(null);
        assertThat(permissions1).isNotEqualTo(permissions2);
    }
}